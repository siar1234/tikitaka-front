import 'package:flutter/material.dart';
import 'package:tikitaka/components/app_profile_image.dart';
import 'package:tikitaka/models/app_user.dart';

class FriendsViewListItem extends StatelessWidget {

  final AppUser user;
  const FriendsViewListItem({super.key, required this.user});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        AppProfileImage(iconSize: 30, desktopIconSize: 30, imageSize: 30, desktopImageSize: 30, user: user),
        Text(user.name)
      ],
    );
  }
}
