import 'package:flutter/material.dart';

class SkillsScreenLargeSizeListViewScrollText extends StatelessWidget {
  const SkillsScreenLargeSizeListViewScrollText({super.key});

  @override
  Widget build(BuildContext context) {
    return const Padding(
      padding: EdgeInsets.only(top: 15, left: 40),
      child: Text(
        "Scroll to see the complete list",
        style: TextStyle(
          fontSize: 20,
          color: Colors.white,
        ),
      ),
    );
  }
}
