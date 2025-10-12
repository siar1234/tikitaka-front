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
import 'package:tikitaka/models/app_user.dart';
import 'package:tikitaka/models/fragment_index.dart';

final fragmentIndexProvider = StateProvider<int>((ref) => FragmentIndex.home);
final profileProvider = StateProvider<AppUser>((ref) => AppUser());
final currentChatroomProvider = StateProvider<int>((ref) => 0);
final registerProvider = StateProvider<bool>((ref) => false);