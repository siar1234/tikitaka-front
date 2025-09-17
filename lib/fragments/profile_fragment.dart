import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tikitaka/channels/app_web_channel.dart';
import 'package:tikitaka/components/app_profile_image.dart';
import 'package:tikitaka/components/card_button.dart';
import 'package:tikitaka/models/app_cache.dart';
import 'package:tikitaka/models/app_localizations.dart';
import 'package:tikitaka/providers/providers.dart';

class ProfileFragment extends ConsumerStatefulWidget {
  const ProfileFragment({super.key});

  @override
  ProfileFragmentState createState() => ProfileFragmentState();
}

class ProfileFragmentState extends ConsumerState<ProfileFragment> {

  late final usernameController = TextEditingController(text: ref.read(profileProvider).name);

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Center(
          child: Container(
            width: 350,
            height: 500,
            decoration: BoxDecoration(
                color: Theme
                    .of(context)
                    .cardColor,
                borderRadius: BorderRadius.circular(15)
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                AppProfileImage(iconSize: 15, desktopIconSize: 250, imageSize: 250, desktopImageSize: 250),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    SizedBox(
                      width: 150,
                      child: TextField(
                        readOnly: true,
                        textAlign: TextAlign.center,
                        controller: usernameController,
                        decoration: InputDecoration(
                          border: InputBorder.none,
                          disabledBorder: InputBorder.none
                        ),
                      ),
                    ),
                  ],
                ),
                Text("${AppLocalizations.of(context).get("friends")}: 0"),
                CardButton(width: 100, height: 40, onPressed: () {
                  appCacheData.token = "";
                  ref.read(fragmentIndexProvider.notifier).state = 0;
                }, title: AppLocalizations.of(context).get("sign_out"), fontSize: 15)
              ],
            ),
          ),
        )
      ],
    );
  }
}
