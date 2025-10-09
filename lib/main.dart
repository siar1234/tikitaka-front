import 'dart:io';

import 'package:bitsdojo_window/bitsdojo_window.dart';
import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:media_kit/media_kit.dart';
import 'package:tikitaka/channels/app_web_channel.dart';
import 'package:tikitaka/models/app_state.dart';
import 'package:tikitaka/pages/main_page.dart';
import 'package:tikitaka/pages/wide_main_page.dart';
import 'package:tikitaka/providers/chats_provider.dart';
import 'package:tikitaka/providers/friends_provider.dart';
import 'package:tikitaka/providers/notifications_provider.dart';
import 'package:tikitaka/providers/providers.dart';

import 'models/app_cache.dart';
import 'models/app_localizations.dart';
import 'models/theme_data.dart';

void main() async  {
  WidgetsFlutterBinding.ensureInitialized();
  MediaKit.ensureInitialized();

  runApp(const ProviderScope(child: MyApp()));
}

class MyApp extends ConsumerStatefulWidget {
  const MyApp({super.key});

  @override
  MyAppState createState() => MyAppState();
}

class MyAppState extends ConsumerState<MyApp> {

  @override
  void initState() {
    appCacheData.getData().then((value) {
      ref.read(chatsProvider.notifier).init();
      ref.read(notificationsProvider.notifier).init();
      ref.read(friendsProvider.notifier).init();
      appWebChannel.getUserInfo(onSuccess: (user) {
        ref.read(profileProvider.notifier).state = user;
      }, onFailed: (d) {
        appState.onLoggedIn(() {
          //appCacheData.token = null;
          appCacheData.save();
        });
      });
      if (Platform.isWindows || Platform.isMacOS || Platform.isLinux) {
        doWhenWindowReady(() {
          appWindow.minSize = const Size(550, 300);
          appWindow.size =
              Size(appCacheData.windowWidth, appCacheData.windowHeight);
          appWindow.alignment = Alignment.center;
          appWindow.title = "Tikitaka";
          appWindow.show();
        });
      }
    });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {

    return MaterialApp(
      theme: lightThemeData,
      darkTheme: darkThemeData,
      localizationsDelegates: const [
        LocalizationDelegate(),
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      home: Platform.isAndroid || Platform.isIOS ? const MainPage() : const WideMainPage(),
    );
  }
}