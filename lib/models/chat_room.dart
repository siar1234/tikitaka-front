import 'dart:convert';

import 'package:tikitaka/models/app_user.dart';

class ChatRoom {
  int id = -1;
  List<ChatMessage> messages = [];
  String title = "";
  List<String> participants = [];
  String lastMessage = "";

  Map<String, dynamic> toMap() {
    return {
      "title": title,
      "participants": participants
    };
  }

  String toJsonBody() {
    return jsonEncode(toMap());
  }

  void insertMessages(List<ChatMessage> list) {
    if (list.isEmpty) return;

    // Create a map of existing message IDs for quick lookup
    final existingIds = messages.map((m) => m.id).toSet();

    // Filter out messages that already exist
    final newMessages = list.where((m) => !existingIds.contains(m.id)).toList();

    // Add the new messages
    messages.addAll(newMessages);

    // Sort messages by creation time (or by id if you prefer)
    // messages.sort((a, b) => b.created.compareTo(a.created));
    messages.sort((a, b) => a.id.compareTo(b.id));

    // Update the last message if there is at least one
    if (messages.isNotEmpty) {
      lastMessage = messages.last.type == ChatMessageType.text
          ? messages.last.message
          : "[Image]";
    }
  }

}

enum ChatMessageType {
  text, image
}

class ChatMessage {
  String message = "";
  AppUser sender = AppUser();
  int id = 0;
  DateTime created = DateTime.now();
  ChatMessageType type = ChatMessageType.text;
  String imageUrl = "";

  static ChatMessage fromMap(Map<String, dynamic> map) {
    var message = ChatMessage();
    // {"type":"TEXT","chatRoomId":1,"senderId":"hey123","senderName":"hey","senderProfileImage":null,"messageId":2,"message":"2342343242423432","createAt":"2025-10-12T01:21:07.974669131","attachments":null}
    //     {"type":"IMAGE","chatRoomId":1,"senderId":"hey123","senderName":"hey","senderProfileImage":null,"messageId":18,"message":null,"createAt":"2025-10-12T04:42:39.719927089","attachments":[{"fileName":"appstore.png","fileUrl":"https://minjoon-bucket-2.s3.us-east-2.amazonaws.com/chat/room//1/51e0593b-b7ff-4327-b496-65a178d588ec"}]}
    var sender = AppUser();
    sender.id = map["senderId"];
    sender.name = map["senderName"];
    sender.profileImage = map["senderProfileImage"];
    message.sender = sender;

    switch(map["type"]) {
      case "TEXT":
        message.message = map["message"] ?? "";
        message.type = ChatMessageType.text;
        break;
      case "IMAGE":
        message.type = ChatMessageType.image;
        var attachments = map["attachments"];
        if(attachments != null) {
          var url = map["attachments"][0]["fileUrl"];
        }
        print(map["attachments"][0]["fileUrl"]);
        message.imageUrl = map["attachments"][0]["fileUrl"];
        break;
    }

    message.id = map["messageId"];
    // message.created = DateTime.fromMillisecondsSinceEpoch(map["createAt"]);
    return message;
  }
}