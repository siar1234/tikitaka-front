import 'package:amphi/widgets/menu/popup/custom_popup_menu_route.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tikitaka/channels/app_web_channel.dart';
import 'package:tikitaka/components/chat_thumbnail.dart';
import 'package:tikitaka/components/chatroom_thumbnail.dart';
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
          final id = ref.watch(currentChatroomProvider);
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
                    child: ChatroomThumbnail(size: 40, chatRoom: chatRoom),
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
                child: ChattingMessagesView(chatRoomId: id),
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
                      PopupMenuButton(
                        icon: Icon(Icons.add_circle_outline),
                        itemBuilder: (context) {
                        return [
                          PopupMenuItem(child: Text("사진"), onTap: () async {
                            final result = await FilePicker.platform.pickFiles(type: FileType.image, allowMultiple: true);
                            if(result != null) {
                              var files = result.files;
                              appWebChannel.uploadFilesChat(
                                  chatRoomId: id,
                                  files: files, onSuccess: () {
                                print("32434324");
                              }, onFailed: (d) {
                                print(d);
                              });
                            }
                          }),
                          PopupMenuItem(child: Text("동영상")),
                          PopupMenuItem(child: Text("파일"))
                        ];
                      },),
                      Expanded(
                          child: TextField(
                      controller: controller,
                            maxLines: 20,
                            minLines: 1,
                          )),
                      IconButton(onPressed: () {
                        appWebChannel.sendMessage(chatRoomId: chatRoom.id, message: controller.text);
                        controller.text = "";
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
