import 'package:amphi/models/app.dart';
import 'package:flutter/material.dart';

class ChatThumbnail extends StatelessWidget {

  final double iconSize;
  final double desktopIconSize;
  final double imageSize;
  final double desktopImageSize;
  const ChatThumbnail({super.key, required this.iconSize, required this.desktopIconSize, required this.imageSize, required this.desktopImageSize});

  @override
  Widget build(BuildContext context) {
    return Icon(Icons.message, size: App.isWideScreen(context) || App.isDesktop() ? desktopIconSize : iconSize
    );
  }
}
