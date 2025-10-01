import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tikitaka/providers/friends_provider.dart';
import 'package:tikitaka/views/friends_view.dart';
import 'package:tikitaka/views/friends_view_list_item.dart';

class FriendsCard extends ConsumerWidget {
  const FriendsCard({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Container(
      width: 350,
      height: 500,
      decoration: BoxDecoration(
        color: Theme.of(context).cardColor,
        borderRadius: BorderRadius.circular(15)
      ),
      child: FriendsView(friends: ref.read(friendsProvider).friends),
    );
  }
}
