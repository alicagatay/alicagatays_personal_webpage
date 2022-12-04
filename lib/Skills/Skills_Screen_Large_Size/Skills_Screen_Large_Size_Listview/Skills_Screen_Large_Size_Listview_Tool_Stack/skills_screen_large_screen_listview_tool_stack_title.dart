import 'package:flutter/material.dart';

class SkillsScreenLargeScreenListViewToolStackTitle extends StatelessWidget {
  const SkillsScreenLargeScreenListViewToolStackTitle({super.key});

  @override
  Widget build(BuildContext context) {
    return const Padding(
      padding: EdgeInsets.only(top: 60, left: 30, right: 30),
      child: Text(
        "Tool Stack",
        style: TextStyle(
          fontSize: 50,
          color: Colors.white,
        ),
      ),
    );
  }
}
