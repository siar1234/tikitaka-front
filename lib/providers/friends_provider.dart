import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tikitaka/models/app_user.dart';

class FriendsState {
  final List<AppUser> friends;

  FriendsState(this.friends);

}

class FriendsNotifier extends StateNotifier<FriendsState> {
  FriendsNotifier() : super(FriendsState([]));

  void init() {
    List<AppUser> list = [];
    var user = AppUser();
    user.name = "23432432432432";
    list.add(user);
    list.add(user);
    list.add(user);    list.add(user);    list.add(user);
    list.add(user);    list.add(user);
    list.add(user);
    list.add(user);


    state = FriendsState(list);
    // appWebChannel.getFriends(onSuccess: (list) {
    //
    // });
  }

}

final friendsProvider = StateNotifierProvider<FriendsNotifier, FriendsState>((ref) {
  return FriendsNotifier();
});