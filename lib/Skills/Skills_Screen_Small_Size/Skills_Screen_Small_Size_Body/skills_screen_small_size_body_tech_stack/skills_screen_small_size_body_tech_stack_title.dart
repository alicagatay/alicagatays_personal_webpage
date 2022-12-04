import 'package:flutter/material.dart';

class SkillsScreenSmallSizeBodyTechStackTitle extends StatelessWidget {
  const SkillsScreenSmallSizeBodyTechStackTitle({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Padding(
        padding: EdgeInsets.only(top: 60),
        child: Text(
          "Tech Stack",
          style: TextStyle(
            fontSize: 50,
            color: Colors.white,
          ),
        ),
      ),
    );
  }
}
