import 'package:flutter/material.dart';

class ChatroomThumbnail extends StatelessWidget {

  final double size;
  const ChatroomThumbnail({super.key, required this.size});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
        width: size,
        height: size,
        child: ClipRRect(
            borderRadius: BorderRadius.circular(size),
            child: Image.asset("assets/images/chat.png")));
  }
}
