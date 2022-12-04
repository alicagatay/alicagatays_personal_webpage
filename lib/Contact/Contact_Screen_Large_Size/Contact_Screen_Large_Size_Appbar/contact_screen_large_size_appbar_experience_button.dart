import 'package:flutter/material.dart';
import 'package:personal_website_new/Experience/experience_screen.dart';

class ContactScreenLargeSizeAppBarExperienceButton extends StatelessWidget {
  const ContactScreenLargeSizeAppBarExperienceButton({super.key});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => const ExperienceScreen(),
          ),
        );
      },
      child: Container(
        alignment: Alignment.center,
        padding: const EdgeInsets.symmetric(horizontal: 40),
        child: Text(
          "Experience",
          style: TextStyle(
            color: Colors.grey[300],
            fontSize: 20,
          ),
        ),
      ),
    );
  }
}
