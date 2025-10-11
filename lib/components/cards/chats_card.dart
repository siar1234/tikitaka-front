import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tikitaka/components/chatroom_item.dart';
import 'package:tikitaka/dialogs/edit_chatroom_dialog.dart';
import 'package:tikitaka/fragments/home_fragment.dart';
import 'package:tikitaka/models/chat_room.dart';
import 'package:tikitaka/providers/chats_provider.dart';
import 'package:tikitaka/providers/providers.dart';

class ChatsCard extends StatelessWidget {
  const ChatsCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: chatsCardWidth,
      decoration: BoxDecoration(
          color: Theme.of(context).cardColor,
          borderRadius: BorderRadius.circular(15)
      ),
      child: Consumer(builder: (context, ref, child) {
       return ListView.builder(
           itemCount: ref.watch(chatsProvider).idList.length,
           itemBuilder: (context, index) {
             var id = ref.watch(chatsProvider).idList[index];
             var chatRoom = ref.watch(chatsProvider).chats.get(id);
             return ChatroomItem(chatRoom: chatRoom, onPressed: () {
               ref.read(currentChatroomProvider.notifier).setId(id, ref);
             });
           });
      }),
    );
  }
}
