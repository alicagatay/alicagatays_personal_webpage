import 'package:flutter/material.dart';

class SkillsScreenSmallSizeBodyTechStackListViewMatlab extends StatelessWidget {
  const SkillsScreenSmallSizeBodyTechStackListViewMatlab({super.key});

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
              'Matlab',
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