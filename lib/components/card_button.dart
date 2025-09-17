import 'package:flutter/material.dart';

class CardButton extends StatelessWidget {

  final double width;
  final double height;
  final void Function() onPressed;
  final String title;
  final double? fontSize;
  const CardButton({super.key, required this.width, required this.height, required this.onPressed, required this.title, this.fontSize});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(4.0),
      child: Material(
        color: Colors.transparent,
        child: InkWell(onTap: onPressed,
            child: Container(
              width: width,
              height: height,
              decoration: BoxDecoration(
                  color: Theme.of(context).highlightColor,
                  borderRadius: BorderRadius.circular(15)
              ),
              child: Center(child: Text(title, style: TextStyle(
                  fontSize: fontSize ?? 20,
                  color: Theme.of(context).cardColor
              ))),
            )
        ),
      ),
    );
  }
}
