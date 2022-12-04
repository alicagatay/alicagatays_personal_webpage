import 'package:flutter/material.dart';

class SkillsScreenSmallSizeBodyDesignStackListViewAffinityDesigner
    extends StatelessWidget {
  const SkillsScreenSmallSizeBodyDesignStackListViewAffinityDesigner(
      {super.key});

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
              'Affinity Designer',
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
