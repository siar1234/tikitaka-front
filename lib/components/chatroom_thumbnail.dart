import 'package:flutter/material.dart';
import 'package:tikitaka/models/chat_room.dart';

class ChatroomThumbnail extends StatelessWidget {

  final ChatRoom chatRoom;
  final double size;
  const ChatroomThumbnail({super.key, required this.size, required this.chatRoom});

  @override
  Widget build(BuildContext context) {

    String? thumbnail;

    for (var item in chatRoom.profileImages) {
      if(item is String) {
        thumbnail = item;
      }
    }

    return SizedBox(
        width: size,
        height: size,
        child: ClipRRect(
            borderRadius: BorderRadius.circular(size),
            child: thumbnail != null ? Image.network(thumbnail) : Image.asset("assets/images/chat.png")));
  }
}
