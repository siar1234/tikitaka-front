import 'package:amphi/widgets/menu/popup/custom_popup_menu_route.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tikitaka/channels/app_web_channel.dart';
import 'package:tikitaka/components/chat_thumbnail.dart';
import 'package:tikitaka/components/chatting_content_menu.dart';
import 'package:tikitaka/views/chatting_message_list_item.dart';
import 'package:tikitaka/providers/chats_provider.dart';
import 'package:tikitaka/providers/providers.dart';
import 'package:tikitaka/views/chatting_messages_view.dart';

class CurrentChatCard extends ConsumerStatefulWidget {
  const CurrentChatCard({super.key});

  @override
  CurrentChatCardState createState() => CurrentChatCardState();
}

class CurrentChatCardState extends ConsumerState<CurrentChatCard> {

var controller = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(color: Theme
          .of(context)
          .cardColor, borderRadius: BorderRadius.circular(15)),
      child: Consumer(
        builder: (context, ref, child) {
          final id = ref.watch(currentChatroomProvider).id;
          final chatRoom = ref
              .watch(chatsProvider)
              .chats
              .get(id);
          return Column(
            children: [
              Row(
                children: [
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: ChatThumbnail(iconSize: 15, desktopIconSize: 40, imageSize: 40, desktopImageSize: 40),
                  ),
                  Expanded(child: Text(chatRoom.title)),
                  PopupMenuButton(
                    itemBuilder: (context) {
                      return [
                        PopupMenuItem(child: Text("채팅방 수정")),
                        PopupMenuItem(child: Text("채팅방 정보"))
                      ];
                    },
                  ),
                ],
              ),
              Expanded(
                child: ChattingMessagesView(chatRoom: chatRoom),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Container(
                  decoration: BoxDecoration(color: Theme
                      .of(context)
                      .scaffoldBackgroundColor, borderRadius: BorderRadius.circular(10)),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      IconButton(
                        onPressed: () {
                          showCustomPopupMenu(context, ChattingContentMenu());
                        },
                        icon: Icon(Icons.add_circle_outline),
                      ),
                      Expanded(
                          child: TextField(
                      controller: controller,
                            maxLines: 20,
                            minLines: 1,
                          )),
                      IconButton(onPressed: () {
                        appWebChannel.sendMessage(chatRoomId: chatRoom.id, message: controller.text);
                      }, icon: Icon(Icons.send)),
                    ],
                  ),
                ),
              ),
            ],
          );
        },
      ),
    );
  }
}
