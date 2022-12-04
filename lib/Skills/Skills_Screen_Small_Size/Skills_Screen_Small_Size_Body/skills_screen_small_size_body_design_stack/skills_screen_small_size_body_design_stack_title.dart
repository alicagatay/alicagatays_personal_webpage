import 'package:flutter/material.dart';

class SkillsScreenSmallSizeBodyDesignStackTitle extends StatelessWidget {
  const SkillsScreenSmallSizeBodyDesignStackTitle({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Padding(
        padding: EdgeInsets.only(top: 60, left: 30, right: 30),
        child: Text(
          "Design Stack",
          style: TextStyle(
            fontSize: 50,
            color: Colors.white,
          ),
        ),
      ),
    );
  }
}
