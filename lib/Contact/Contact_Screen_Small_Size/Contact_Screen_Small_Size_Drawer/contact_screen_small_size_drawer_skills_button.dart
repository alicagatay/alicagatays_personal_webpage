import 'package:flutter/material.dart';
import 'package:personal_website_new/Skills/skills_screen.dart';

class ContactScreenSmallSizeDrawerSkillsButton extends StatelessWidget {
  const ContactScreenSmallSizeDrawerSkillsButton({super.key});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => const SkillsScreen(),
          ),
        );
      },
      child: Container(
        alignment: Alignment.center,
        padding: const EdgeInsets.symmetric(vertical: 40),
        child: Text(
          "Skills",
          style: TextStyle(
            color: Colors.grey[300],
            fontSize: 30,
          ),
        ),
      ),
    );
  }
}
