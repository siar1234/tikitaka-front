import 'package:amphi/models/app.dart';
import 'package:flutter/material.dart';
import 'package:tikitaka/models/app_user.dart';

class AppProfileImage extends StatelessWidget {

  final AppUser user;
  final double size;
  const AppProfileImage({super.key, required this.size, required this.user});

  @override
  Widget build(BuildContext context) {
    if(user.profileImage != null) {
      return Container(
         width: size,
        height: size,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          color: Theme.of(context).cardColor,
        ),
        child: ClipRRect(
            borderRadius: BorderRadius.circular(size),
            child: Image.network(user.profileImage!, fit: BoxFit.cover,)),
      );
    }
    return Icon(Icons.account_circle, size: size
    );
  }
}
