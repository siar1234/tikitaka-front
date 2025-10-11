import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tikitaka/models/app_user.dart';

import '../channels/app_web_channel.dart';

class FriendsState {
  final List<AppUser> friends;

  FriendsState(this.friends);

}

class FriendsNotifier extends StateNotifier<FriendsState> {
  FriendsNotifier() : super(FriendsState([]));

  void init() {
    appWebChannel.getFriends(onSuccess: (list) {
      print("heyyy");
      state = FriendsState(list);
    }, onFailed: (d) {

    },);
  }

}

final friendsProvider = StateNotifierProvider<FriendsNotifier, FriendsState>((ref) {
  return FriendsNotifier();
});