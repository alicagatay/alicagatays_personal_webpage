import 'package:flutter/material.dart';
import 'package:personal_website_new/Projects/Projects_Screen_Small_Size/Projects_Screen_Small_Size_Drawer/projects_screen_small_size_drawer_contact_button.dart';
import 'package:personal_website_new/Projects/Projects_Screen_Small_Size/Projects_Screen_Small_Size_Drawer/projects_screen_small_size_drawer_experience_button.dart';
import 'package:personal_website_new/Projects/Projects_Screen_Small_Size/Projects_Screen_Small_Size_Drawer/projects_screen_small_size_drawer_home_button.dart';
import 'package:personal_website_new/Projects/Projects_Screen_Small_Size/Projects_Screen_Small_Size_Drawer/projects_screen_small_size_drawer_skills_button.dart';

class ProjectsScreenSmallSizeDrawer extends StatelessWidget {
  const ProjectsScreenSmallSizeDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: const <Widget>[
        ProjectsScreenSmallSizeDrawerHomeButton(),
        ProjectsScreenSmallSizeDrawerSkillsButton(),
        ProjectsScreenSmallSizeDrawerExperienceButton(),
        ProjectsScreenSmallSizeDrawerContactButton(),
      ],
    );
  }
}
