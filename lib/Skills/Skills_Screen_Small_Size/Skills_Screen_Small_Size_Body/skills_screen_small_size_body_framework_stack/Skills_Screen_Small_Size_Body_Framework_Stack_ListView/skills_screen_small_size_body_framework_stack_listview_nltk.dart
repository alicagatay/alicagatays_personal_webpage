import 'package:flutter/material.dart';

class SkillsScreenSmallSizeBodyFrameworkStackListViewNLTK
    extends StatelessWidget {
  const SkillsScreenSmallSizeBodyFrameworkStackListViewNLTK({super.key});

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
              'NLTK',
              style: TextStyle(
                fontSize: 40,
                color: Colors.white,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
