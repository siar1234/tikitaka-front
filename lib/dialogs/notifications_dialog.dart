import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tikitaka/components/notification_list_item.dart';
import 'package:tikitaka/providers/notifications_provider.dart';

class NotificationsDialog extends ConsumerWidget {
  const NotificationsDialog({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Dialog(
      child: SizedBox(
        width: 300,
        height: 500,
        child: Stack(
          children: [
            Align(
              alignment: Alignment.topRight,
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: IconButton(onPressed: () {
                  Navigator.pop(context);
                }, icon: Icon(Icons.cancel_outlined)),
              ),
            ),
            Positioned(
                left: 0,
                right: 0,
                bottom: 0,
                top: 50,
                child: ListView.builder(
                    itemCount: ref.watch(notificationsProvider).notifications.length,
                    itemBuilder: (context, index) {
                      return NotificationListItem(notification: ref.read(notificationsProvider).notifications[index]);
                    }))
          ],
        ),
      ),
    );
  }
}
