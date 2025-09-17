import 'package:flutter/material.dart';

class ChatroomThumbnail extends StatelessWidget {

  final double size;
  const ChatroomThumbnail({super.key, required this.size});

  @override
  Widget build(BuildContext context) {
    return Icon(Icons.chat, size: size,);
  }
}
