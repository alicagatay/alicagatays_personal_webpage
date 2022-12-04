import 'package:flutter/material.dart';
import 'package:personal_website_new/Experience/Experience_Screen_Small_Size/Experience_Screen_Small_Size_Drawer/experience_screen_small_size_drawer_contact_button.dart';
import 'package:personal_website_new/Experience/Experience_Screen_Small_Size/Experience_Screen_Small_Size_Drawer/experience_screen_small_size_drawer_home_button.dart';
import 'package:personal_website_new/Experience/Experience_Screen_Small_Size/Experience_Screen_Small_Size_Drawer/experience_screen_small_size_drawer_projects_button.dart';
import 'package:personal_website_new/Experience/Experience_Screen_Small_Size/Experience_Screen_Small_Size_Drawer/experience_screen_small_size_drawer_skills_button.dart';

class ExperienceScreenSmallSizeDrawer extends StatelessWidget {
  const ExperienceScreenSmallSizeDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: const <Widget>[
        ExperienceScreenSmallSizeDrawerHomeButton(),
        ExperienceScreenSmallSizeDrawerSkillsButton(),
        ExperienceScreenSmallSizeDrawerProjectsButton(),
        ExperienceScreenSmallSizeDrawerContactButton(),
      ],
    );
  }
}
