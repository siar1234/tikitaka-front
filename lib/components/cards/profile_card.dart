import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tikitaka/providers/friends_provider.dart';
import 'package:tikitaka/providers/providers.dart';

import '../../models/app_cache.dart';
import '../../models/app_localizations.dart';
import '../app_profile_image.dart';
import '../card_button.dart';

class ProfileCard extends ConsumerStatefulWidget {
  const ProfileCard({super.key});

  @override
  ProfileCardState createState() => ProfileCardState();
}

class ProfileCardState extends ConsumerState<ProfileCard> {
  late final usernameController = TextEditingController(text: ref.read(profileProvider).name);

  @override
  void dispose() {
    usernameController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
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
          GestureDetector(
            onTap: () async {
              final files = await FilePicker.platform.pickFiles(type: FileType.image, allowMultiple: false);
              final file = files?.files.firstOrNull;
              if(file != null) {

                print(file.path);
              }
            },
            child: AppProfileImage(iconSize: 15,
                desktopIconSize: 250,
                imageSize: 250,
                desktopImageSize: 250,
                user: ref.watch(profileProvider),
            ),
          ),
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
          Text("친구: ${ref.watch(friendsProvider).friends.length}"),
          CardButton(width: 100,
              height: 40,
              onPressed: () {
                appCacheData.token = "";
                ref
                    .read(fragmentIndexProvider.notifier)
                    .state = 0;
              },
              title: AppLocalizations.of(context).get("sign_out"),
              fontSize: 15)
        ],
      ),
    );
  }
}