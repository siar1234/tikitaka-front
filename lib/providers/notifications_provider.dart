
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tikitaka/models/notification_model.dart';

class NotificationsState {
  final List<NotificationModel> notifications;

  NotificationsState(this.notifications);

}

class NotificationsNotifier extends StateNotifier<NotificationsState> {
  NotificationsNotifier() : super(NotificationsState([]));

  void init() {
    List<NotificationModel> list = [
      NotificationModel(),
      NotificationModel(),
      NotificationModel(),
      NotificationModel(),
      NotificationModel(),
      NotificationModel(),
      NotificationModel(),
      NotificationModel(),
      NotificationModel(),
      NotificationModel(),
      NotificationModel(),
    ];

    state = NotificationsState(list);
    // appWebChannel.getNotifications(onSuccess: (list) {
    //
    // });
  }

}

final notificationsProvider = StateNotifierProvider<NotificationsNotifier, NotificationsState>((ref) {
  return NotificationsNotifier();
});