enum NotificationType {
  friendRequest,

}

class NotificationModel {
  String title = "";
  NotificationType type = NotificationType.friendRequest;
  Map<String, dynamic> data = {};

  // Notification.fromMap() {
  //
  // }
}