import 'package:flutter/material.dart';

class SkillsScreenLargeScreenListViewToolStackListViewJetBrains
    extends StatelessWidget {
  const SkillsScreenLargeScreenListViewToolStackListViewJetBrains({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(60),
      child: SizedBox(
        width: 250,
        child: Card(
          color: Colors.grey[800],
          child: const Center(
            child: Text(
              "JetBrains IDE's",
              style: TextStyle(
                fontSize: 30,
                color: Colors.white,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
