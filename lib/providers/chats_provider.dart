import 'dart:io';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tikitaka/channels/app_web_channel.dart';
import 'package:tikitaka/models/chat_room.dart';
import 'package:tikitaka/providers/providers.dart';

class ChatsState {
  final Map<int, ChatRoom> chats;
  final List<int> idList;

  ChatsState(this.chats, this.idList);

}

class ChatsNotifier extends StateNotifier<ChatsState> {
  ChatsNotifier() : super(ChatsState({}, []));
  
  void init(WidgetRef ref) async {
    appWebChannel.getChats(onSuccess: (list) async {
      List<int> idList = [];
      Map<int, ChatRoom> chats = {};

      for(var chatRoom in list) {
        idList.add(chatRoom.id);
        chats[chatRoom.id] = chatRoom;

        appWebChannel.subscribeChatroom(chatRoom.id, ref);
        await appWebChannel.getChatHistory(chatRoomId: chatRoom.id, messageId: 65, onSuccess: (list) {
          chats[chatRoom.id]!.messages =        list.reversed.toList();
        });
      }
      if(list.isNotEmpty) {
        ref.read(currentChatroomProvider.notifier).state = list[0].id;
      }

      state = ChatsState(chats, idList);
    });
  }

  void addMessage(int id, Map<String, dynamic> message) {
    final chat = state.chats[id];
    if(chat == null) return;

    chat.messages.add(ChatMessage.fromMap(message));
    chat.lastMessage = message["message"] ?? "";

    final chats = {...state.chats, id: chat};
    final idList = [...state.idList];

    state = ChatsState(chats, idList);
  }

  void insertChat(ChatRoom chatRoom) {
    final chats = {...state.chats, chatRoom.id: chatRoom};

    final list = [...state.idList];
    final mergedList = list.contains(chatRoom.id) ? [...state.idList] : [...list, chatRoom.id];

    state = ChatsState(chats, mergedList);
  }

}

final chatsProvider = StateNotifierProvider<ChatsNotifier, ChatsState>((ref) {
  return ChatsNotifier();
});

extension ChatsNullSafe on Map<int, ChatRoom> {
  ChatRoom get(int id) {
    return this[id] ?? ChatRoom();
  }
}

// extension SortEx on List {
//   void sortChats(String sortOption, Map<String, Photo> map) {
//     switch(sortOption) {
//       case SortOption.date:
//         sort((a, b) {
//           return map.get(a).date.compareTo(map.get(b).date);
//         });
//         break;
//       case SortOption.created:
//         sort((a, b) {
//           return map.get(a).created.compareTo(map.get(b).created);
//         });
//         break;
//       case SortOption.modified:
//         sort((a, b) {
//           return map.get(a).modified.compareTo(map.get(b).modified);
//         });
//         break;
//       case SortOption.deleted:
//         sort((a, b) {
//           return map.get(a).deleted!.compareTo(map.get(b).deleted!);
//         });
//         break;
//       case SortOption.title:
//         sort((a, b) {
//           return map.get(a).title.toLowerCase().compareTo(map.get(b).title.toLowerCase());
//         });
//         break;
//       case SortOption.dateDescending:
//         sort((a, b) {
//           return map.get(b).date.compareTo(map.get(a).date);
//         });
//         break;
//       case SortOption.createdDescending:
//         sort((a, b) {
//           return map.get(b).created.compareTo(map.get(a).created);
//         });
//         break;
//       case SortOption.modifiedDescending:
//         sort((a, b) {
//           return map.get(b).modified.compareTo(map.get(a).modified);
//         });
//         break;
//       case SortOption.deletedDescending:
//         sort((a, b) {
//           return map.get(b).deleted!.compareTo(map.get(a).deleted!);
//         });
//         break;
//       case SortOption.titleDescending:
//         sort((a, b) {
//           return map.get(b).title.toLowerCase().compareTo(map.get(a).title.toLowerCase());
//         });
//         break;
//     }
//   }
// }