import 'package:flutter/material.dart';
import 'package:personal_website_new/Projects/Projects_Screen_Large_Size/projects_screen_large_size.dart';
import 'package:personal_website_new/Projects/Projects_Screen_Small_Size/projects_screen_small_size.dart';

class ProjectsScreen extends StatelessWidget {
  const ProjectsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    if (MediaQuery.of(context).size.width >= 953) {
      return const ProjectsScreenLargeSize();
    } else {
      return const ProjectsScreenSmallSize();
    }
  }
}
