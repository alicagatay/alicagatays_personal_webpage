import 'package:flutter/material.dart';

class SkillsScreenSmallSizeBodyToolStackTitle extends StatelessWidget {
  const SkillsScreenSmallSizeBodyToolStackTitle({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Padding(
        padding: EdgeInsets.only(top: 60),
        child: Text(
          "Tool Stack",
          style: TextStyle(
            fontSize: 50,
            color: Colors.white,
          ),
        ),
      ),
    );
  }
}
