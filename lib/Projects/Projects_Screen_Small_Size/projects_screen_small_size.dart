import 'package:flutter/material.dart';
import 'package:personal_website_new/Projects/Projects_Screen_Small_Size/Projects_Screen_Small_Size_Body/projects_screen_small_size_body.dart';
import 'package:personal_website_new/Projects/Projects_Screen_Small_Size/Projects_Screen_Small_Size_Drawer/projects_screen_small_size_drawer.dart';
import 'package:personal_website_new/Projects/Projects_Screen_Small_Size/projects_screen_small_size_appbar.dart';

class ProjectsScreenSmallSize extends StatelessWidget {
  const ProjectsScreenSmallSize({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      appBar: ProjectsScreenSmallSizeAppBar(),
      drawer: ProjectsScreenSmallSizeDrawer(),
      backgroundColor: Colors.black,
      body: ProjectsScreenSmallSizeBody(),
    );
  }
}
