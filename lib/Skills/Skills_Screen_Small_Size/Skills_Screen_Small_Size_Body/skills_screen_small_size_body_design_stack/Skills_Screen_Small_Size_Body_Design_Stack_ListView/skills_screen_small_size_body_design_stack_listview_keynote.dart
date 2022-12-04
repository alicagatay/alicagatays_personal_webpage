import 'package:flutter/material.dart';

class SkillsScreenSmallSizeBodyDesignStackListViewKeynote
    extends StatelessWidget {
  const SkillsScreenSmallSizeBodyDesignStackListViewKeynote({super.key});

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
              'Keynote',
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
