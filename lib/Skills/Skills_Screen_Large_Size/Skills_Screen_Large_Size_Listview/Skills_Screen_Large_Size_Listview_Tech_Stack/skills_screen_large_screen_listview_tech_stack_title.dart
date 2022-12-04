import 'package:flutter/material.dart';

class SkillsScreenLargeScreenListViewTechStackTitle extends StatelessWidget {
  const SkillsScreenLargeScreenListViewTechStackTitle({super.key});

  @override
  Widget build(BuildContext context) {
    return const Padding(
      padding: EdgeInsets.only(top: 60, left: 30, right: 30),
      child: Text(
        "Tech Stack",
        style: TextStyle(
          fontSize: 50,
          color: Colors.white,
        ),
      ),
    );
  }
}
