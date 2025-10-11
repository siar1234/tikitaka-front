import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tikitaka/channels/app_web_channel.dart';
import 'package:tikitaka/models/notification_model.dart';
import 'package:tikitaka/providers/friends_provider.dart';

class NotificationListItem extends ConsumerWidget {

  final NotificationModel notification;

  const NotificationListItem({super.key, required this.notification});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        splashColor: Theme
            .of(context)
            .highlightColor
            .withAlpha(25),
        highlightColor: Theme
            .of(context)
            .highlightColor
            .withAlpha(25),
        onTap: () {

        },
        child: Row(children: [
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Text(notification.title, style: TextStyle(
                  fontSize: Theme
                      .of(context)
                      .textTheme
                      .bodyMedium!
                      .fontSize! + 5
              )),
            ),
          ),
          if(notification.type == NotificationType.friendRequest) ... [
            TextButton(onPressed: () {
              appWebChannel.acceptFriendRequest(id: notification.data["senderId"], onSuccess: () {
                ref.read(friendsProvider.notifier).init();
              });
            }, child: Text("수락"))
          ]
        ]),
      ),
    );
  }
}
