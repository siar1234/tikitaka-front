import 'package:flutter/material.dart';
import 'package:tikitaka/models/chat_room.dart';

class ChattingMessageListItem extends StatelessWidget {

  final ChatMessage message;
  const ChattingMessageListItem({super.key, required this.message});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          decoration: BoxDecoration(

          ),
          child: Text(
              message.message,
            softWrap: true,
          ),
        )
      ],
    );
  }
}
