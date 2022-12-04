import 'package:flutter/material.dart';
import 'package:personal_website_new/Contact/contact_screen.dart';

class ExperienceScreenSmallSizeDrawerContactButton extends StatelessWidget {
  const ExperienceScreenSmallSizeDrawerContactButton({super.key});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => const ContactScreen(),
          ),
        );
      },
      child: Container(
        alignment: Alignment.center,
        padding: const EdgeInsets.symmetric(vertical: 40),
        child: Text(
          "Contact",
          style: TextStyle(
            color: Colors.grey[300],
            fontSize: 30,
          ),
        ),
      ),
    );
  }
}
