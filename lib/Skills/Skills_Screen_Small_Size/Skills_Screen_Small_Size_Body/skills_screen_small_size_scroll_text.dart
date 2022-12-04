import 'package:flutter/material.dart';

class SkillsScreenSmallSizeScrollText extends StatelessWidget {
  const SkillsScreenSmallSizeScrollText({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Padding(
        padding: EdgeInsets.only(top: 10),
        child: Text(
          "Scroll to see the complete list",
          style: TextStyle(
            fontSize: 20,
            color: Colors.white,
          ),
        ),
      ),
    );
  }
}
