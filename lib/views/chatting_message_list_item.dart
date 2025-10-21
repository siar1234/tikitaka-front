import 'package:amphi/widgets/account/profile_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';
import 'package:tikitaka/channels/app_web_channel.dart';
import 'package:tikitaka/channels/chat_service.dart';
import 'package:tikitaka/components/app_profile_image.dart';
import 'package:tikitaka/models/app_cache.dart';
import 'package:tikitaka/models/chat_room.dart';
import 'package:tikitaka/providers/chats_provider.dart';
import 'package:tikitaka/providers/providers.dart';

class ChattingMessageListItem extends ConsumerWidget {

  final ChatRoom chatRoom;
  final ChatMessage message;
  const ChattingMessageListItem({super.key, required this.message, required this.chatRoom});

  @override
  Widget build(BuildContext context, WidgetRef ref) {

    final sentFromMe = message.sender.id == ref.watch(profileProvider).id;
    final themeData = Theme.of(context);
     var count = chatRoom.participants.length - message.readUsers.length;

    if(!message.readUsers.contains(ref.watch(profileProvider).id)) {
      print(ref.watch(profileProvider).id);
      print("    if(!message.readUsers.contains(ref.watch(profileProvider).id)) {");
      appWebChannel.sendMessageRead(chatRoomId: chatRoom.id, messageId: message.id);
      // message.readUsers.add(ref.watch(profileProvider).id);
      // ref.read(chatsProvider.notifier).acknowledgeMessageRead(chatRoom.id, ref.watch(profileProvider).id, message.id);
    }

    //final count = chatRoom.profileImages.length - message.readUsers.length;
    // final countText =

    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        crossAxisAlignment: sentFromMe ? CrossAxisAlignment.end : CrossAxisAlignment.start,
        children: [
          if(!sentFromMe) ... [
            Padding(
              padding: const EdgeInsets.only(top: 8.0),
              child: Row(
                children: [
                  AppProfileImage(size: 40, user: message.sender),
                  Text(message.sender.name)
                ],
              ),
            ),
          ],
          Padding(
            padding:  const EdgeInsets.only(left: 15),
            child: Builder(
              builder: (context) {
                if(message.type == ChatMessageType.image) {
                  return SizedBox(
                    height: 150,
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(15),
                      child: Image(
                        image: NetworkImage(
                          message.imageUrl,
                        ),
                      ),
                    ),
                  );
                }
                return Container(
                  decoration: BoxDecoration(
                    color: sentFromMe ? themeData.highlightColor : themeData.scaffoldBackgroundColor,
                    borderRadius: BorderRadius.circular(15)
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Text(
                        message.message,
                        softWrap: true,
                        style: TextStyle(
                            color: sentFromMe ? themeData.cardColor : null
                        ),
                      ),
                  ),
                );
              }
            ),
          ),
          Text(
            count == 0 ? DateFormat.jm().format(message.created) : (sentFromMe ? "$count ${DateFormat.jm().format(message.created)}" : "${DateFormat.jm().format(message.created)} ${chatRoom.participants.length - message.readUsers.length}")
          )
        ],
      ),
    );
  }
}
