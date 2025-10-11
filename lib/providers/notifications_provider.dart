
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tikitaka/models/notification_model.dart';

class NotificationsState {
  final List<NotificationModel> notifications;

  NotificationsState(this.notifications);

}

class NotificationsNotifier extends StateNotifier<NotificationsState> {
  NotificationsNotifier() : super(NotificationsState([]));

  void init() {
    List<NotificationModel> list = [];

    state = NotificationsState(list);
    // appWebChannel.getNotifications(onSuccess: (list) {
    //
    // });
  }

  void add(NotificationModel mo) {
    final list = [...state.notifications];
    list.add(mo);

    state = NotificationsState(list);
  }

}

final notificationsProvider = StateNotifierProvider<NotificationsNotifier, NotificationsState>((ref) {
  return NotificationsNotifier();
});