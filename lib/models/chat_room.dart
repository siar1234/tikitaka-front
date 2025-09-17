import 'dart:convert';

class ChatRoom {
  int id = -1;
  List<ChatMessage> messages = [];
  String title = "";

  Map<String, dynamic> toMap() {
    return {
      "chatName": title,
      "participants": []
    };
  }

  String toJsonBody() {
    return jsonEncode(toMap());
  }
}

class ChatMessage {
  String message = "";
}