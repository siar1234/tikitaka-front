//
// import 'package:flutter_riverpod/flutter_riverpod.dart';
//
//   chats: [],
//   setChats: (chats) => set({ chats }),
//   friends: [],
//   setFriends: (friends) => set({ friends }),
//   notifications: [],
//   setNotifications: (notifications) => set({ notifications }),
//   chatRoom: {
//     title: "",
//     subtitle: "",
//     messages: []
//   },
//   setChatRoom: (chatRoom) => set({ chatRoom }),
//   userInfo: {},
//   setUserInfo: (userInfo) => set({ userInfo }),
//   isAuthStateChanged: false,
//   setAuthStateChanged: (isAuthStateChanged) => set({ isAuthStateChanged }),
//   stompClient: null,
//   setStompClient: (stompClient) => set({ stompClient }),
//   receivedMessages: {},
//   setReceivedMessages: (receivedMessages) => set({receivedMessages}),
//   marketplaceFragmentIndex: 0,
//   setMarketplaceFragmentIndex: (marketplaceFragmentIndex) => set({marketplaceFragmentIndex}),
// }));

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tikitaka/channels/app_web_channel.dart';
import 'package:tikitaka/models/app_user.dart';
import 'package:tikitaka/models/chat_room.dart';
import 'package:tikitaka/models/fragment_index.dart';

class CurrentChatroomState {
  final int id;
  final List<ChatMessage> messages;

  CurrentChatroomState(this.id, this.messages);
}

class CurrentChatroomNotifier extends Notifier<CurrentChatroomState> {
  @override
  CurrentChatroomState build() {
    return CurrentChatroomState(0, []);
  }

  void setId(int id, WidgetRef ref) {
    appWebChannel.subscribeChatroom(id, ref);

    state = CurrentChatroomState(id, [...state.messages]);
  }

  void addMessage(Map<String, dynamic> msg) {

  }


}

final fragmentIndexProvider = StateProvider<int>((ref) => FragmentIndex.home);
final profileProvider = StateProvider<AppUser>((ref) => AppUser());
final currentChatroomProvider = NotifierProvider<CurrentChatroomNotifier, CurrentChatroomState>(() => CurrentChatroomNotifier());
final registerProvider = StateProvider<bool>((ref) => false);