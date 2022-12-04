import 'package:flutter/material.dart';

class SkillsScreenSmallSizeBodyFrameworkStackTitle1 extends StatelessWidget {
  const SkillsScreenSmallSizeBodyFrameworkStackTitle1({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Padding(
        padding: EdgeInsets.only(top: 60),
        child: Text(
          "Framework & Library",
          style: TextStyle(
            fontSize: 40,
            color: Colors.white,
          ),
        ),
      ),
    );
  }
}
