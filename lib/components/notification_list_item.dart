import 'package:flutter/material.dart';
import 'package:tikitaka/models/notification_model.dart';

class NotificationListItem extends StatelessWidget {

  final NotificationModel notification;
  const NotificationListItem({super.key, required this.notification});

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        splashColor: Theme.of(context).highlightColor.withAlpha(25),
        highlightColor: Theme.of(context).highlightColor.withAlpha(25),
        onTap: () {

        },
        child: Row(children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text(notification.title, style: TextStyle(
              fontSize: Theme.of(context).textTheme.bodyMedium!.fontSize! + 5
            )),
          )
        ]),
      ),
    );
  }
}
