import 'package:flutter/material.dart';

class ChattingContentMenu extends StatelessWidget {
  const ChattingContentMenu({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 200,
      height: 150,
      decoration: BoxDecoration(
        color: Theme.of(context).cardColor,
        borderRadius: BorderRadius.circular(15),
      ),
      child: GridView(
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 3),
        children: [
          _CustomButton(
            icon: Icons.photo,
            title: "사진",
            onPressed: () {

            },
          ),
          _CustomButton(
            icon: Icons.photo,
            title: "동영상",
            onPressed: () {

            },
          ),
          _CustomButton(
            icon: Icons.photo,
            title: "파일",
            onPressed: () {

            },
          ),
          _CustomButton(
            icon: Icons.photo,
            title: "음성",
            onPressed: () {

            },
          ),
          _CustomButton(
            icon: Icons.photo,
            title: "사진",
            onPressed: () {

            },
          ),
          _CustomButton(
            icon: Icons.photo,
            title: "사진",
            onPressed: () {

            },
          )
        ],
      ),
    );
  }
}

class _CustomButton extends StatelessWidget {
  
  final IconData icon;
  final String title;
  final void Function() onPressed;
  const _CustomButton({required this.icon, required this.title, required this.onPressed});

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onPressed,
        splashColor: Theme.of(context).highlightColor.withAlpha(25),
        highlightColor: Theme.of(context).highlightColor.withAlpha(25),
        child: Column(
          children: [
            Icon(icon,
            size: 50,),
            Text(title)
          ],
        ),
      ),
    );
  }
}
