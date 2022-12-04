import 'package:flutter/material.dart';
import 'package:personal_website_new/Projects/projects_screen.dart';

class HomeScreenLargeSizeAppBarProjectsButton extends StatelessWidget {
  const HomeScreenLargeSizeAppBarProjectsButton({super.key});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => const ProjectsScreen(),
          ),
        );
      },
      child: Container(
        alignment: Alignment.center,
        padding: const EdgeInsets.symmetric(horizontal: 40),
        child: Text(
          "Projects",
          style: TextStyle(
            color: Colors.grey[300],
            fontSize: 20,
          ),
        ),
      ),
    );
  }
}
