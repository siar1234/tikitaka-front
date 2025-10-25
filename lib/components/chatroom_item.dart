import 'package:flutter/material.dart';
import 'package:tikitaka/components/chatroom_thumbnail.dart';
import 'package:tikitaka/models/chat_room.dart';

class ChatroomItem extends StatelessWidget {
  
  final ChatRoom chatRoom;
  final void Function() onPressed;
  const ChatroomItem({super.key, required this.chatRoom, required this.onPressed});

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onPressed,
        child: Row(
          children: [
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: ChatroomThumbnail(size: 40, chatRoom: chatRoom,),
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(chatRoom.title),
                Text(chatRoom.lastMessage)
              ],
            ),
          ],
        ),
      ),
    );
  }
}
