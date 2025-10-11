import 'package:flutter_riverpod/flutter_riverpod.dart';

class SelectedFriendsNotifier extends Notifier<List<String>?> {
  @override
  List<String>? build() {
    return null;
  }
  void startSelection() {
    state = [];
  }

  void endSelection() {
    state = null;
  }

  void addId(String id) {
    if(state == null) {
      return;
    }
    if (!state!.contains(id)) {
      state = [...state!, id];
    }
  }

  void removeId(String id) {
    if(state == null) {
      return;
    }
    state = state!.where((e) => e != id).toList();
  }
}

final selectedFriendsProvider = NotifierProvider<SelectedFriendsNotifier, List<String>?>(() {
  return SelectedFriendsNotifier();
});