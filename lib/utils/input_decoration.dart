import 'package:flutter/material.dart';

InputDecoration outlinedInputDecoration({String? hintText, required BuildContext context}) {
  return InputDecoration(
      hintText: hintText,
    focusedBorder: OutlineInputBorder(
        borderSide: BorderSide(
            color: Theme.of(context).highlightColor,
            style: BorderStyle.solid,
            width: 2),
        borderRadius: BorderRadius.circular(5)
    ),
    border: OutlineInputBorder(
        borderSide: BorderSide(
            color: Theme.of(context).disabledColor,
            style: BorderStyle.solid,
            width: 1),
        borderRadius: BorderRadius.circular(5)
    ),
    enabledBorder: OutlineInputBorder(
        borderSide: BorderSide(
            color: Theme.of(context).disabledColor,
            style: BorderStyle.solid,
            width: 1),
        borderRadius: BorderRadius.circular(5)
    ),
    disabledBorder: OutlineInputBorder(
        borderSide: BorderSide(
            color: Theme.of(context).disabledColor,
            style: BorderStyle.solid,
            width: 1),
        borderRadius: BorderRadius.circular(5)
    ),
  );
}