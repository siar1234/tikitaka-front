import 'package:amphi/widgets/account/profile_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tikitaka/components/app_profile_image.dart';
import 'package:tikitaka/models/app_user.dart';
import 'package:tikitaka/models/fragment_index.dart';
import 'package:tikitaka/providers/providers.dart';

class AccountButton extends ConsumerWidget {

  final double? iconSize;
  final Color? iconColor;
  final AppUser user;
  const AccountButton({super.key, this.iconSize, this.iconColor, required this.user});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return IconButton(onPressed: () {
      ref.read(fragmentIndexProvider.notifier).state = FragmentIndex.profile;
    }, icon: AppProfileImage(user: user, size: iconSize ?? 20));
  }
}
