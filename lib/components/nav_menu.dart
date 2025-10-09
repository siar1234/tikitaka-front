import 'dart:io';

import 'package:amphi/widgets/menu/popup/show_menu.dart';
import 'package:bitsdojo_window/bitsdojo_window.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tikitaka/components/account_button.dart';
import 'package:tikitaka/dialogs/add_friend_dialog.dart';
import 'package:tikitaka/dialogs/notifications_dialog.dart';
import 'package:tikitaka/models/app_cache.dart';
import 'package:tikitaka/models/fragment_index.dart';
import 'package:tikitaka/providers/providers.dart';

import '../channels/app_web_channel.dart';
import '../dialogs/edit_chatroom_dialog.dart';
import '../models/chat_room.dart';

final double _iconSize = 30;

class NavMenu extends ConsumerWidget {
  const NavMenu({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final iconColor = Theme
        .of(context)
        .cardColor;
    double top = 10;
    if (Platform.isMacOS) {
      top = 55;
    }

    return Positioned(
      left: 15,
      top: top,
      bottom: 15,
      child: Container(
        width: 60,
        decoration: BoxDecoration(
            color: Theme
                .of(context)
                .highlightColor,
            borderRadius: BorderRadius.circular(15)
        ),
        child: Column(
          children: [
            AccountButton(
              iconSize: _iconSize,
              iconColor: iconColor,
            ),
            IconButton(
              icon: Icon(Icons.home, size: _iconSize, color: iconColor,),
              onPressed: () {
                appCacheData.windowHeight = appWindow.size.height;
                appCacheData.windowWidth = appWindow.size.width;
                appCacheData.save();
                ref.read(fragmentIndexProvider.notifier).state = FragmentIndex.home;
              },
            ),
            IconButton(
              icon: Icon(Icons.notifications, size: _iconSize, color: iconColor,),
              onPressed: () {
                appCacheData.windowHeight = appWindow.size.height;
                appCacheData.windowWidth = appWindow.size.width;
                appCacheData.save();
                showDialog(context: context, builder: (context) => NotificationsDialog());
              },
            ),
            PopupMenuButton(
              icon: Icon(Icons.add_circle_outline, size: _iconSize, color: iconColor,),
              itemBuilder: (context) {
                return [
                  PopupMenuItem(child: Text("친구"), onTap: () {
                    // showDialog(context: context, builder: (context) => AddFriendDialog());
                    appWebChannel.getAvailableFriends();
                  }),
                  PopupMenuItem(child: Text("채팅방"), onTap: () {
                    showDialog(context: context, builder: (context) => EditChatroomDialog(chatRoom: ChatRoom()));
                  }),
                ];
              },
            ),
            IconButton(
              icon: Icon(Icons.settings, size: _iconSize, color: iconColor,),
              onPressed: () {
                appCacheData.windowHeight = appWindow.size.height;
                appCacheData.windowWidth = appWindow.size.width;
                appCacheData.save();
                ref.read(fragmentIndexProvider.notifier).state = FragmentIndex.settings;
              },
            )
          ],
        ),
      ),
    );
  }
}
