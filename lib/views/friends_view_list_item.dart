import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tikitaka/components/app_profile_image.dart';
import 'package:tikitaka/models/app_user.dart';

import '../providers/selected_friends_provider.dart';

class FriendsViewListItem extends ConsumerWidget {

  final AppUser user;

  const FriendsViewListItem({super.key, required this.user});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Row(
      children: [
        AppProfileImage(iconSize: 40,
            desktopIconSize: 40,
            imageSize: 40,
            desktopImageSize: 40,
            user: user),
        Text(user.name),
        if(ref.watch(selectedFriendsProvider) != null) ...[
          Checkbox(value: ref.watch(selectedFriendsProvider)?.contains(user.id) == true, onChanged: (value) {
            if(ref.watch(selectedFriendsProvider)?.contains(user.id) == true) {
              ref.read(selectedFriendsProvider.notifier).removeId(user.id);
            }
            else {
              ref.read(selectedFriendsProvider.notifier).addId(user.id);
            }
          })
        ]
      ],
    );
  }
}
