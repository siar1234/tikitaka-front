import 'package:amphi/models/app.dart';
import 'package:flutter/material.dart';
import 'package:tikitaka/models/app_user.dart';

class AppProfileImage extends StatelessWidget {

  final AppUser user;
  final double iconSize;
  final double desktopIconSize;
  final double imageSize;
  final double desktopImageSize;
  const AppProfileImage({super.key, required this.iconSize, required this.desktopIconSize, required this.imageSize, required this.desktopImageSize, required this.user});

  @override
  Widget build(BuildContext context) {
    return Icon(Icons.account_circle, size: App.isWideScreen(context) || App.isDesktop() ? desktopIconSize : iconSize
    );
  }
}
