import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tikitaka/components/chatroom_item.dart';
import 'package:tikitaka/dialogs/edit_chatroom_dialog.dart';
import 'package:tikitaka/fragments/home_fragment.dart';
import 'package:tikitaka/models/chat_room.dart';
import 'package:tikitaka/providers/chats_provider.dart';

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
      child: Stack(
        children: [
          Positioned(
            right: 0,
            top: 0,
            child: IconButton(
                onPressed: () {
                  showDialog(context: context, builder: (context) => EditChatroomDialog(chatRoom: ChatRoom()));
                  // final RenderBox button = context.findRenderObject() as RenderBox;
                  // final RenderBox overlay = Overlay.of(context).context.findRenderObject() as RenderBox;
                  // final Offset position = button.localToGlobal(Offset.zero, ancestor: overlay);
                  //
                  // RelativeRect relativeRect = RelativeRect.fromLTRB(
                  //   1,
                  //   position.dy + 50,
                  //   0.8,
                  //   0,
                  // );
                  // showCustomPopupMenuByPosition(context, relativeRect , Container(
                  //   width: 250,
                  //   height: 150,
                  //   decoration: BoxDecoration(
                  //       color: Theme.of(context).cardColor,
                  //       borderRadius: BorderRadius.circular(15)
                  //   ),
                  // ));
                }, icon: Icon(Icons.add_circle_outline)),
          ),
          Positioned(
              left: 0,
              right: 0,
              top: 50,
              bottom: 0,
              child: Consumer(builder: (context, ref, child) {
               return ListView.builder(
                   itemCount: ref.watch(chatsProvider).idList.length,
                   itemBuilder: (context, index) {
                     var id = ref.read(chatsProvider).idList[index];
                     return ChatroomItem(chatRoom: ref.read(chatsProvider).chats.get(id), onPressed: () {

                     });
                   });
              }))
        ],
      ),
    );
  }
}
