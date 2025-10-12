import 'package:amphi/widgets/account/profile_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';
import 'package:tikitaka/components/app_profile_image.dart';
import 'package:tikitaka/models/app_cache.dart';
import 'package:tikitaka/models/chat_room.dart';
import 'package:tikitaka/providers/providers.dart';

class ChattingMessageListItem extends ConsumerWidget {

  final ChatMessage message;

  const ChattingMessageListItem({super.key, required this.message});

  @override
  Widget build(BuildContext context, WidgetRef ref) {

    final sentFromMe = message.sender.id == ref.watch(profileProvider).id;
    final themeData = Theme.of(context);

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
                  AppProfileImage(iconSize: 40, desktopIconSize: 40, imageSize: 40, desktopImageSize: 40, user: message.sender),
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
            DateFormat.jm().format(message.created)
          )
        ],
      ),
    );
  }
}
