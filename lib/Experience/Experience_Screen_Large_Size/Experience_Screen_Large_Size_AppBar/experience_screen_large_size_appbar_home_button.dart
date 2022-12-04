import 'package:flutter/material.dart';
import 'package:personal_website_new/HomeScreen/home_screen.dart';

class ExperienceScreenLargeSizeAppBarHomeButton extends StatelessWidget {
  const ExperienceScreenLargeSizeAppBarHomeButton({super.key});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => const HomeScreen(),
          ),
        );
      },
      child: Container(
        alignment: Alignment.center,
        padding: const EdgeInsets.symmetric(horizontal: 40),
        child: Text(
          "Home",
          style: TextStyle(
            color: Colors.grey[300],
            fontSize: 20,
          ),
        ),
      ),
    );
  }
}
