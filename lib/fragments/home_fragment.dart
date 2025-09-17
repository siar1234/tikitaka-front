import 'package:amphi/models/app.dart';
import 'package:amphi/widgets/menu/popup/custom_popup_menu_route.dart';
import 'package:bitsdojo_window/bitsdojo_window.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tikitaka/components/cards/chats_card.dart';
import 'package:tikitaka/components/cards/current_chat_card.dart';

final double chatsCardWidth = 250;

class HomeFragment extends ConsumerStatefulWidget {
  const HomeFragment({super.key});

  @override
  ConsumerState<HomeFragment> createState() => _ChatsFragmentState();
}

class _ChatsFragmentState extends ConsumerState<HomeFragment> {
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Positioned(
          left: 15,
            top: 15,
            bottom: 15,
            child: ChatsCard()),
        Positioned(
            left: chatsCardWidth + 15 + 15,
            right: 15,
            top: 15,
            bottom: 15,
            child: CurrentChatCard()),
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
      ],
    );
  }
}
