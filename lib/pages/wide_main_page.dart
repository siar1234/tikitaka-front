import 'package:amphi/models/app.dart';
import 'package:bitsdojo_window/bitsdojo_window.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tikitaka/fragments/profile_fragment.dart';
import 'package:tikitaka/models/app_cache.dart';
import 'package:tikitaka/models/app_state.dart';
import '../fragments/home_fragment.dart';
import '../models/fragment_index.dart';
import 'package:tikitaka/pages/wide_login_page.dart';
import '../providers/providers.dart';

import '../components/nav_menu.dart';

class WideMainPage extends ConsumerStatefulWidget {
  const WideMainPage({super.key});

  @override
  ConsumerState<WideMainPage> createState() => _WideMainPageState();
}

class _WideMainPageState extends ConsumerState<WideMainPage> {

  @override
  void initState() {
    appState.onLoggedIn = setState;
    super.initState();
  }

  @override
  Widget build(BuildContext context) {

    if(appCacheData.token.isEmpty && appCacheData.initialized) {
      return WideLoginPage();
    }

    final fragmentIndex = ref.watch(fragmentIndexProvider);

    return Scaffold(
      body: Stack(
        children: [
          if(App.isDesktop()) ... [
            Positioned(
              left: 0,
              top: 0,
              right: 0,
              child: SizedBox(
                height: 60,
                child: MoveWindow(),
              ),
            )
          ],
          const NavMenu(),
          Positioned(
              left: 80,
              right: 0,
              bottom: 0,
              top: 0,
              child: () {
                switch(fragmentIndex) {
                  case FragmentIndex.profile:
                    return ProfileFragment();
                  default:
                    return HomeFragment();
                }
              }()
          )
        ],
      ),
    );
  }
}