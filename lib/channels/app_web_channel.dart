import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:amphi/models/app_web_channel_core.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:http/http.dart';
import 'package:stomp_dart_client/stomp_dart_client.dart';
import 'package:tikitaka/models/app_cache.dart';
import 'package:tikitaka/models/app_user.dart';
import 'package:tikitaka/models/chat_room.dart';
import 'package:tikitaka/models/notification_model.dart';
import 'package:tikitaka/providers/chats_provider.dart';
import 'package:tikitaka/providers/notifications_provider.dart';
import 'package:tikitaka/providers/providers.dart';

final appWebChannel = AppWebChannel.getInstance();

const backendURL = "http://127.0.0.1:8080";

class AppWebChannel {
  static final _instance = AppWebChannel();

  static AppWebChannel getInstance() => _instance;

  String get token => appCacheData.token;

  Future<void> login({
    required String id,
    required String password,
    required void Function(String token) onSuccess,
    required void Function(int?) onFailed,
  }) async {
    Map<String, dynamic> data = {'id': id, 'password': password};

    String postData = json.encode(data);

    try {
      final response = await post(
        Uri.parse("${backendURL}/api/auth/sign_in"),
        headers: <String, String>{'Content-Type': 'application/json; charset=UTF-8'},
        body: postData,
      );

      var body = jsonDecode(response.body);
      String token = body["token"];
      if (token.isNotEmpty && response.statusCode == 200) {
        onSuccess(token);
      } else {
        onFailed(HttpStatus.unauthorized);
      }
    } catch (e) {
      print(e);
      onFailed(null);
    }
  }

  Future<void> register({
    required String username,
    required String id,
    required String password,
    required void Function() onSuccess,
    required void Function(int?) onFailed,
  }) async {
    Map<String, dynamic> data = {'id': id, 'password': password, "name": username};

    String postData = json.encode(data);
    try {
      final response = await post(
        Uri.parse("${backendURL}/api/auth/sign_up"),
        headers: <String, String>{'Content-Type': 'application/json; charset=UTF-8'},
        body: postData,
      );
      if (response.statusCode == 200) {
        onSuccess();
      } else {
        onFailed(response.statusCode);
      }
    } catch (e) {
      print(e);
      onFailed(null);
    }
  }

  Future<void> getJson({required String url, required void Function(Map<String, dynamic>) onSuccess, void Function(int?)? onFailed}) async {
    try {
      final response = await get(
        Uri.parse(url),
        headers: <String, String>{'Content-Type': 'application/json; charset=UTF-8', "Authorization": "Bearer ${appCacheData.token}"},
      );

      if (response.statusCode == 200) {
        onSuccess(jsonDecode(utf8.decode(response.bodyBytes)));
      } else {
        print("failed $url, ${response.statusCode} ${appCacheData.token}");
        print(<String, String>{'Content-Type': 'application/json; charset=UTF-8', "Authorization": "Bearer ${appCacheData.token}"});
        onFailed?.call(HttpStatus.unauthorized);
      }
    } catch (e) {
      print(url);
      print(e);
      onFailed?.call(null);
    }
  }

  Future<void> getFriends({required void Function(List<AppUser>) onSuccess, required void Function(int?) onFailed}) async {
    await getJson(
      url: "${backendURL}/api/friend/get/list",
      onSuccess: (data) {
        print(data);
        List<AppUser> users = [];
        var list = data["list"];
        if (list is List) {
          for (var item in list) {
            print(item);
            var user = AppUser();
            user.id = item["id"];
            user.name = item["name"];
            user.profileImage = item["profileImage"];
            users.add(user);
          }
        }

        onSuccess(users);
      },
      onFailed: onFailed,
    );
  }

  Future<void> getChats({required void Function(List<ChatRoom>) onSuccess, void Function(int?)? onFailed}) async {
    await getJson(
      url: "$backendURL/api/chat/get/list",
      onSuccess: (body) {
        print(body);
        var list = body["list"];
        List<ChatRoom> result = [];
        for (var map in list) {
          if (map is Map<String, dynamic>) {
            var chatRoom = ChatRoom();
            chatRoom.id = map["chatRoomId"];
            chatRoom.title = map["title"];
            chatRoom.lastMessage = map["lastMessage"] ?? "";
            result.add(chatRoom);
          }
        }
        onSuccess(result);
      },
      onFailed: onFailed,
    );
  }

  Future<void> getUserInfo({required void Function(AppUser) onSuccess, void Function(int?)? onFailed}) async {
    await getJson(
      url: "$backendURL/api/user/get/me",
      onSuccess: (body) {
        print(body);
        var userData = body["user"];
        var user = AppUser();
        user.id = userData["id"];
        user.name = userData["name"];
        user.profileImage = userData["profileImage"];
        onSuccess(user);
      },
      onFailed: onFailed,
    );
  }

  Future<void> postJson({
    required String url,
    required Map<String, dynamic> jsonBody,
    void Function()? onSuccess,
    void Function(int?)? onFailed,
  }) async {
    try {
      final response = await post(
        Uri.parse(url),
        headers: <String, String>{'Content-Type': 'application/json; charset=UTF-8', "Authorization": "Bearer ${appCacheData.token}"},
        body: jsonEncode(jsonBody),
      );
      if (response.statusCode == 200) {
        if (onSuccess != null) {
          onSuccess();
        }
      } else {
        if (onFailed != null) {
          onFailed(response.statusCode);
        }
      }
    } catch (e) {
      print(e);
      if (onFailed != null) {
        onFailed(null);
      }
    }
  }

  Future<void> createChat({required ChatRoom chatRoom, required void Function() onSuccess, void Function(int?)? onFailed}) async {
    await postJson(url: "$backendURL/api/chat/create", jsonBody: chatRoom.toMap(), onSuccess: onSuccess, onFailed: onFailed);
  }

  Future<void> getAvailableFriends({required String searchId, required void Function(List<AppUser>) onSuccess}) async {
    await getJson(
      url: "$backendURL/api/friend/add/list?searchId=$searchId",
      onSuccess: (body) {
        List<dynamic> list = body["users"];
        List<AppUser> users = [];
        for (Map<String, dynamic> item in list) {
          print(item);
          AppUser user = AppUser();
          user.id = item["id"];
          user.name = item["name"];
          user.profileImage = item["profileImage"];
          user.friendRequestStatus = item["status"];
          users.add(user);
        }
        onSuccess(users);
      },
      onFailed: (d) {
        print("object $d");
      },
    );
  }

  Future<void> requestFriend({required String userId, void Function()? onSuccess}) async {
    try {
      final response = await post(
        Uri.parse("$backendURL/api/friend/send?receiverId=$userId"),
        headers: <String, String>{'Content-Type': 'application/json; charset=UTF-8', "Authorization": "Bearer ${appCacheData.token}"},
      );
      if (response.statusCode == 200) {
        onSuccess?.call();
      } else {
        print("$backendURL/api/friend/send?receiverId=$userId");
        print(response.statusCode);
        print(response.body);
        // if (onFailed != null) {
        //   onFailed(response.statusCode);
        // }
      }
    } catch (e) {
      print(e);
      // if (onFailed != null) {
      //   onFailed(null);
      // }
    }
  }

  Future<void> cancelFriendRequest({required String userId, void Function()? onSuccess}) async {
    try {
      final response = await delete(
        Uri.parse("$backendURL/api/friend/cancle?receiverId=$userId"),
        headers: <String, String>{'Content-Type': 'application/json; charset=UTF-8', "Authorization": "Bearer ${appCacheData.token}"},
      );
      if (response.statusCode == 200) {
        onSuccess?.call();
      } else {
        print("$backendURL/api/friend/cancle?receiverId=$userId");
        print(response.statusCode);
        print(response.body);
        // if (onFailed != null) {
        //   onFailed(response.statusCode);
        // }
      }
    } catch (e) {
      print(e);
      // if (onFailed != null) {
      //   onFailed(null);
      // }
    }
  }

  StompClient? stompClient;

  void listenAlarm(WidgetRef ref, void Function() onConnect) {
    stompClient?.deactivate();
    stompClient = StompClient(
      config: StompConfig.sockJS(
        url: 'http://localhost:8080/ws',
        onConnect: (frame) {
          print("object");
          onAlarmRecieved(frame, ref);
          onConnect();
        },
        beforeConnect: () async {
          print('Connecting to WebSocket...');
          await Future.delayed(Duration(milliseconds: 200));
        },
        stompConnectHeaders: {'Authorization': 'Bearer ${appCacheData.token}'},
        webSocketConnectHeaders: {'Authorization': 'Bearer ${appCacheData.token}'},
        onWebSocketError: (dynamic error) => print('WebSocket Error: $error'),
        onStompError: (StompFrame frame) => print('STOMP Error: ${frame.body}'),
      ),
    );

    stompClient?.activate();
  }



  void subscribeChatroom(int id, WidgetRef ref) {
    stompClient?.subscribe(
      destination: '/topic/chat/${id}',
      callback: (frame) {
        try {
          var id = ref.watch(currentChatroomProvider);
          print('📩 chat Message received: ${frame.body}');
          ref.read(chatsProvider.notifier).addMessage(id, jsonDecode(frame.body!));

        } catch (e) {
          print("#432432432ui43232");
          print(e);
        }
      },
    );
  }

  void onAlarmRecieved(StompFrame frame, WidgetRef ref) {
    stompClient?.subscribe(
      destination: '/user/queue/notify',
      callback: (frame) {
        try {
          NotificationModel model = NotificationModel();
          model.data = jsonDecode(frame.body!);
          if (model.data["type"] == "FRIEND_REQUEST") {
            model.type = NotificationType.friendRequest;
            model.title = "${model.data["senderId"]}님이 친구요청을 보냈습니다";

            ref.read(notificationsProvider.notifier).add(model);
          }
          else if(model.data["type"] == "CREATE_CHAT_ROOM") {
            ChatRoom chatRoom=  ChatRoom();
            chatRoom.id = int.parse(model.data["referenceId"]);
            ref.read(chatsProvider.notifier).init(ref);
          }


          print('📩 Message received: ${frame.body}');
        } catch (e) {
          print(e);
        }
      },
    );
  }

  Future<void> acceptFriendRequest({required String id, required void Function() onSuccess}) async {
    postJson(url: "$backendURL/api/friend/accept?senderId=$id", jsonBody: {}, onSuccess: onSuccess);
  }

  void sendMessage({required int chatRoomId, required String message}) {
    stompClient?.send(
      destination: '/app/send',
      body: jsonEncode({'chatRoomId': chatRoomId.toString(), 'message': message}),
      headers: {'content-type': 'application/json', "Authorization": "Bearer ${appCacheData.token}"},
    );
  }

  Future<void> uploadFilesChat({
    required int chatRoomId,
    required List<PlatformFile> files,
    void Function()? onSuccess,
    void Function(int?)? onFailed
}) async {
    try {
      final request = MultipartRequest('POST', Uri.parse("$backendURL/app/send/file"));
      request.headers.addAll({"Authorization": "Bearer ${appCacheData.token}"});
      for(var pFile in files) {

        final totalLength = pFile.size;


        final stream = pFile.xFile.openRead();
        int bytesSent = 0;
        final byteStream = stream.transform<List<int>>(
          StreamTransformer.fromHandlers(
            handleData: (data, sink) {
               bytesSent += data.length;
               sink.add(data);
              // if (onProgress != null) {
              //   onProgress(bytesSent, totalLength);
              // }
            },
          ),
        );

        print(pFile.name);
        final multipartFile = MultipartFile(
          // pFile.name,
          "files",
          byteStream,
          totalLength,
          filename: pFile.name,
        );

        request.files.add(multipartFile);
      }
      
      request.fields.addAll({"chatRoomId": chatRoomId.toString()});

      final response = await request.send();

      if (response.statusCode == 200) {
        onSuccess?.call();
      } else {
        onFailed?.call(response.statusCode);
      }
    } catch (e) {
      print(e);
      onFailed?.call(null);
    }
  }

  Future<void> getChatHistory({required int chatRoomId, required int messageId, required void Function(List<ChatMessage>) onSuccess}) async {
    await getJson(url: "$backendURL/api/chat/get/history?chatRoomId=$chatRoomId&messageId=$messageId", onSuccess: (body) {
      print(body);
      List<ChatMessage> result = [];
      for(var item in body["list"]) {
        result.add(ChatMessage.fromMap(item));
      }

      onSuccess(result);
    });
  }
}
