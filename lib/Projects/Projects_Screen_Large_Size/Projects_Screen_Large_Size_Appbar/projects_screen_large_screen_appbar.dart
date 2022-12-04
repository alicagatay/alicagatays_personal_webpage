import 'package:flutter/material.dart';
import 'package:personal_website_new/Projects/Projects_Screen_Large_Size/Projects_Screen_Large_Size_Appbar/projects_screen_large_screen_appbar_contact_button.dart';
import 'package:personal_website_new/Projects/Projects_Screen_Large_Size/Projects_Screen_Large_Size_Appbar/projects_screen_large_screen_appbar_experience_button.dart';
import 'package:personal_website_new/Projects/Projects_Screen_Large_Size/Projects_Screen_Large_Size_Appbar/projects_screen_large_screen_appbar_home_button.dart';
import 'package:personal_website_new/Projects/Projects_Screen_Large_Size/Projects_Screen_Large_Size_Appbar/projects_screen_large_screen_appbar_skills_button.dart';
import 'package:personal_website_new/Projects/Projects_Screen_Large_Size/Projects_Screen_Large_Size_Appbar/projects_screen_large_screen_appbar_title.dart';

class ProjectsScreenLargeScreenAppBar extends StatelessWidget
    with PreferredSizeWidget {
  const ProjectsScreenLargeScreenAppBar({super.key});

  @override
  Widget build(BuildContext context) {
    return AppBar(
      automaticallyImplyLeading: false,
      toolbarHeight: 80,
      backgroundColor: Colors.grey[900],
      title: const ProjectsScreenLargeScreenAppBarTitle(),
      actions: const <Widget>[
        ProjectsScreenLargeScreenAppBarHomeButton(),
        ProjectsScreenLargeScreenAppBarSkillsButton(),
        ProjectsScreenLargeScreenAppBarExperienceButton(),
        ProjectsScreenLargeScreenAppBarContactButton()
      ],
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}
