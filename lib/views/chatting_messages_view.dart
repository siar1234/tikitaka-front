import 'package:flutter/material.dart';
import 'package:tikitaka/models/chat_room.dart';

import 'chatting_message_list_item.dart';

class ChattingMessagesView extends StatelessWidget {

  final ChatRoom chatRoom;
  const ChattingMessagesView({super.key, required this.chatRoom});

  @override
  Widget build(BuildContext context) {
    if(chatRoom.messages.isEmpty) {
      return Center(
        child: Text("채팅이 없"),
      );
    }

    return ListView.builder(
      itemCount: chatRoom.messages.length,
      itemBuilder: (context, index) {
        return ChattingMessageListItem(message: chatRoom.messages[index]);
      },
    );
  }
}
