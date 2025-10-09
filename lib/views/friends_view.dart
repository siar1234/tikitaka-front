import 'package:flutter/material.dart';
import 'package:tikitaka/models/app_user.dart';
import 'package:tikitaka/views/friends_view_list_item.dart';

import '../components/app_profile_image.dart';

class FriendsView extends StatelessWidget {

  final List<AppUser> friends;
  const FriendsView({super.key, required this.friends});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: friends.length,
        itemBuilder: (context, index) {
      return FriendsViewListItem(user: friends[index]);
    });
  }
}
