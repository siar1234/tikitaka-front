import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tikitaka/models/fragment_index.dart';
import 'package:tikitaka/providers/providers.dart';

class AccountButton extends ConsumerWidget {

  final double? iconSize;
  final Color? iconColor;

  const AccountButton({super.key, this.iconSize, this.iconColor});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return IconButton(onPressed: () {
      ref.read(fragmentIndexProvider.notifier).state = FragmentIndex.profile;
    }, icon: Icon(
      Icons.account_circle,
      color: iconColor,
      size: iconSize,
    ));
  }
}
