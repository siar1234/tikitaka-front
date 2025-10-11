import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tikitaka/channels/app_web_channel.dart';
import 'package:tikitaka/models/chat_room.dart';
import 'package:tikitaka/providers/friends_provider.dart';
import 'package:tikitaka/utils/input_decoration.dart';
import 'package:tikitaka/views/friends_view.dart';

class EditChatroomDialog extends StatelessWidget {

  final ChatRoom chatRoom;
  const EditChatroomDialog({super.key, required this.chatRoom});

  @override
  Widget build(BuildContext context) {
    return Dialog(
      child: SizedBox(
        width: 250,
        height: 450,
        child: Column(
          children: [
            Align(
              alignment: Alignment.centerRight,
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    IconButton(onPressed: () {
                      Navigator.pop(context);
                    }, icon: Icon(Icons.cancel_outlined)),
                    IconButton(onPressed: () {
                      if(chatRoom.id == -1) {
                        appWebChannel.createChat(chatRoom: chatRoom, onSuccess: () {

                        }, onFailed: (d) {
                          print(d);
                        });
                      }
                      else {

                      }
                    }, icon: Icon(Icons.check_circle_outline)),
                  ],
                ),
              ),
            ),
            Expanded(child: Consumer(
              builder: (context, ref, child) {
                return FriendsView(friends: ref.read(friendsProvider).friends);
              }
            ))
          ],
        ),
      ),
    );
  }
}
