import 'dart:convert';

import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../models/app_cache.dart';
import '../providers/chats_provider.dart';
import '../providers/providers.dart';
import 'app_web_channel.dart';

extension ChatService on AppWebChannel {
  void sendMessageRead({required int chatRoomId, required int messageId}) {
    print("sendMessageRead");
    stompClient?.send(
      destination: '/update/read',
      body: jsonEncode({
        "chatRoomId": chatRoomId,
        "messageId": messageId
      }),
      headers: {'content-type': 'application/json', "Authorization": "Bearer ${appCacheData.token}"},
    );
  }

  void subscribeMessageRead(WidgetRef ref) {

    stompClient?.subscribe(
      destination: "/topic/members/info/",
      callback: (frame) {
        print("/topic/members/info ");

      //   {
      //     "chatRoomId":20,
      //   "userId":"asdasd",
      //   "lastReadMessageId":100
      // }
        try {
          var body = jsonDecode(frame.body!);
          ref.read(chatsProvider.notifier).acknowledgeMessageRead(body["chatRoomId"], body["userId"], body["lastReadMessageId"]);

        } catch (e) {
          print("#432432432ui43232");
          print(e);
        }
      },
    );
  }
}