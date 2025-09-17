import 'dart:convert';
import 'dart:io';

import 'package:amphi/models/app_web_channel_core.dart';
import 'package:http/http.dart';
import 'package:tikitaka/models/app_cache.dart';
import 'package:tikitaka/models/app_user.dart';
import 'package:tikitaka/models/chat_room.dart';

final appWebChannel = AppWebChannel.getInstance();

const backendURL = "http://127.0.0.1:8080";

class AppWebChannel {
  static final _instance = AppWebChannel();

  static AppWebChannel getInstance() => _instance;

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
        Uri.parse("${backendURL}/api/user/signIn"),
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

  Future<void> getJson({required String url, required void Function(Map<String, dynamic>) onSuccess, void Function(int?)? onFailed}) async {
    try {
      final response = await get(
        Uri.parse(url),
        headers: <String, String>{'Content-Type': 'application/json; charset=UTF-8', "Authorization": "Bearer ${appCacheData.token}"},
      );

      if (response.statusCode == 200) {
        onSuccess(jsonDecode(utf8.decode(response.bodyBytes)));
      } else {
        onFailed?.call(HttpStatus.unauthorized);
      }
    } catch (e) {
      print(e);
      onFailed?.call(null);
    }
  }

  Future<void> getFriends({required void Function() onSuccess, required void Function(int?) onFailed}) async {
    await getJson(
      url: "${backendURL}/api/friend/list",
      onSuccess: (data) {
        var list = data["list"];
      },
      onFailed: onFailed,
    );
  }

  Future<void> getChats({required void Function(List<ChatRoom>) onSuccess, void Function(int?)? onFailed}) async {
    await getJson(
      url: "$backendURL/api/chat/list",
      onSuccess: (body) {
        var list = body["chatList"];
        List<ChatRoom> result = [];
        for (var map in list) {
          if (map is Map<String, dynamic>) {
            var chatRoom = ChatRoom();
            chatRoom.id = map["chatId"];
            chatRoom.title = map["chatName"];
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
      url: "$backendURL/api/member",
      onSuccess: (body) {
        var userData = body["user"];
        print(userData.runtimeType);
        var user = AppUser();
        user.id = userData["userId"];
        user.name = userData["userName"];
        user.profileImage = userData["userProfileImage"];
        onSuccess(user);
        print(body);
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
        headers: <String, String>{'Content-Type': 'application/json; charset=UTF-8', "Authorization": appCacheData.token},
        body: jsonBody,
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
      if (onFailed != null) {
        onFailed(null);
      }
    }
  }

  Future<void> createChat({required ChatRoom chatRoom, required void Function() onSuccess, void Function(int?)? onFailed}) async {
    await postJson(url: "$backendURL/api/chat/create", jsonBody: chatRoom.toMap());
  }

  /*
    *

export async function createChat({onFailed, onSuccess, name, participants}) {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/chat/create`, {
            chatName: name,
            participants: participants
        } ,{
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${Cookies.get('Authorization')}`,
                'Content-Type': 'application/json; charset=utf-8'
            },
        });

        if(response.status === 200){
            onSuccess(response);
        }
        else {
            return onFailed(null, response);
        }

    } catch (error) {
        return onFailed(error, null);
    }
}

export async function getChatRoomMessages({onFailed, onSuccess, chatId}) {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/chat/message/list/${chatId}`,{
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${Cookies.get('Authorization')}`,
                'Content-Type': 'application/json; charset=utf-8'
            },
        });

        if(response.status === 200){
            onSuccess(response.data.messages);
        }
        else {
            return onFailed(null, response);
        }

    } catch (error) {
        return onFailed(error, null);
    }
}

export async function inviteToChat({onFailed, onSuccess, participants, chatId}) {
    console.log(participants);
    console.log(chatId);
    try {
        const response = await axios.post(`${BACKEND_URL}/api/chat/add`, {
            chatId: chatId,
            participants: participants
        } ,{
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${Cookies.get('Authorization')}`,
                'Content-Type': 'application/json; charset=utf-8'
            },
        });

        if(response.status === 200){
            onSuccess(response);
        }
        else {
            return onFailed(null, response);
        }

    } catch (error) {
        return onFailed(error, null);
    }
}

export async function getAvailableParticipants({onFailed, onSuccess, chatId}) {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/chat/add/list/${chatId}`,{
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${Cookies.get('Authorization')}`,
                'Content-Type': 'application/json; charset=utf-8'
            },
        });

        if(response.status === 200){
            onSuccess(response.data.friends);
        }
        else {
            return onFailed(null, response);
        }
    } catch (error) {
        return onFailed(error, null);
    }
}

export async function connectWebsocket() {

}
export async function getNotifications() {
    return [
        {
            "title": "고길동님이 당신에게 친구신청을 했습니다."
        },
        {
            "title": "황근출님이 당신을 채팅방으로 초대했습니다."
        }
    ];
}

export async function getAvailableFriendsById({id, onSuccess, onFailed, currentUserId}) {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/friend/add/list/${id}`, {
            withCredentials: true,
            headers: { 'Authorization': `Bearer ${Cookies.get('Authorization') }` },
        });

        if(response.status === 200){
            const result = [];
            for(const user of response.data.users) {
                if(currentUserId !== user.userId){
                    result.push(user);
                }
            }
            onSuccess(result);
        }
        else {
            return onFailed(null, response.status);
        }

    } catch (error) {
        return onFailed(error, null);
    }
}

export async function updateUserInfo({onSuccess, onFailed, name, password, profileImage}) {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/member/update`,
            {
                name: name,
                password: password,
                profileImage: profileImage
            }
            ,{
            withCredentials: true,
            headers: { 'Authorization': `Bearer ${Cookies.get('Authorization') }` },
        });

        if(response.status === 200){
            onSuccess();
        }
        else {
            return onFailed(null, response.status);
        }

    } catch (error) {
        return onFailed(error, null);
    }
}

export async function uploadUserProfileImage({onSuccess, onFailed, formData}) {
    try {
        const response = await axios.post(`${BACKEND_URL}/file/upload`,
            formData
            ,{
                withCredentials: true,
                headers: { 'Authorization': `Bearer ${Cookies.get('Authorization') }` },
            });

        if(response.status === 200){
            onSuccess(response.data);
        }
        else {
            return onFailed(null, response.status);
        }

    } catch (error) {
        return onFailed(error, null);
    }
}


    *
    * */
}
