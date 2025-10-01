import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tikitaka/channels/app_web_channel.dart';
import 'package:tikitaka/components/app_profile_image.dart';
import 'package:tikitaka/components/card_button.dart';
import 'package:tikitaka/components/cards/friends_card.dart';
import 'package:tikitaka/components/cards/profile_card.dart';
import 'package:tikitaka/models/app_cache.dart';
import 'package:tikitaka/models/app_localizations.dart';
import 'package:tikitaka/providers/providers.dart';

class ProfileFragment extends ConsumerStatefulWidget {
  const ProfileFragment({super.key});

  @override
  ProfileFragmentState createState() => ProfileFragmentState();
}

class ProfileFragmentState extends ConsumerState<ProfileFragment> {

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Padding(
          padding: const EdgeInsets.all(15.0),
          child: ProfileCard(),
        ),
        FriendsCard()
      ],
    );
  }
}