import 'package:amphi/widgets/account/profile_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tikitaka/channels/app_web_channel.dart';
import 'package:tikitaka/components/app_profile_image.dart';
import 'package:tikitaka/components/card_button.dart';
import 'package:tikitaka/models/app_user.dart';

import '../providers/friends_provider.dart';
import '../utils/input_decoration.dart';
import '../views/friends_view.dart';

class AddFriendDialog extends StatefulWidget {
  const AddFriendDialog({super.key});

  @override
  State<AddFriendDialog> createState() => _AddFriendDialogState();
}

class _AddFriendDialogState extends State<AddFriendDialog> {

  List<AppUser> availableFriends = [];

  @override
  Widget build(BuildContext context) {
    return Dialog(
      child: SizedBox(
        width: 250,
        height: 300,
        child: Column(
          children: [
            Align(
              alignment: Alignment.centerRight,
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    IconButton(onPressed: () {
                      Navigator.pop(context);
                    }, icon: Icon(Icons.cancel_outlined)),
                  ],
                ),
              ),
            ),
            SizedBox(
              height: 60,
              child: Padding(
                padding: const EdgeInsets.only(left: 8.0, right: 8),
                child: TextField(
                  onChanged: (text) {
                    appWebChannel.getAvailableFriends(searchId: text, onSuccess: (list) {
                      setState(() {
                        availableFriends = list;
                      });
                    });
                  },
                  decoration: outlinedInputDecoration(context: context),
                ),
              ),
            ),
            Expanded(child: ListView.builder(
                itemCount: availableFriends.length,
                itemBuilder: (context, index) {
                  final user = availableFriends[index];
              return Row(
                children: [
                  AppProfileImage(iconSize: 30, desktopIconSize: 30, imageSize: 30, desktopImageSize: 30, user: user),
                  Expanded(child: Text(user.name)),
                  user.friendRequestStatus == "RECEIVED" ||  user.friendRequestStatus == "SEND" ? TextButton(onPressed: () {
                    appWebChannel.cancelFriendRequest(userId: user.id, onSuccess: () {
                      setState(() {
                        availableFriends[index].friendRequestStatus = "NONE";
                      });
                    });
                  }, child: Text("요청취소")) :
                  TextButton(onPressed: () {
                    appWebChannel.requestFriend(userId: user.id, onSuccess: () {
                      setState(() {
                        availableFriends[index].friendRequestStatus = "RECEIVED";
                      });
                    });
                  }, child: Text("친구요청"))
                ],
              );
            }))
          ],
        ),
      ),
    );
  }
}
