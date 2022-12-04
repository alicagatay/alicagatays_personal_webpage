import 'package:flutter/material.dart';
import 'package:personal_website_new/Projects/Projects_Screen_Large_Size/Projects_Screen_Large_Size_Appbar/projects_screen_large_screen_appbar.dart';
import 'package:personal_website_new/Projects/Projects_Screen_Large_Size/Projects_Screen_Large_Size_Body/projects_screen_large_size_body.dart';

class ProjectsScreenLargeSize extends StatelessWidget {
  const ProjectsScreenLargeSize({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      appBar: ProjectsScreenLargeScreenAppBar(),
      backgroundColor: Colors.black,
      body: ProjectsScreenLargeSizeBody(),
    );
  }
}
