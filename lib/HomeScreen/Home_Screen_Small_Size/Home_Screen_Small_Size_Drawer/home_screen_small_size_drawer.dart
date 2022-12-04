import 'package:flutter/material.dart';
import 'package:personal_website_new/HomeScreen/Home_Screen_Small_Size/Home_Screen_Small_Size_Drawer/home_screen_small_size_drawer_contact_button.dart';
import 'package:personal_website_new/HomeScreen/Home_Screen_Small_Size/Home_Screen_Small_Size_Drawer/home_screen_small_size_drawer_experience_button.dart';
import 'package:personal_website_new/HomeScreen/Home_Screen_Small_Size/Home_Screen_Small_Size_Drawer/home_screen_small_size_drawer_projects_button.dart';
import 'package:personal_website_new/HomeScreen/Home_Screen_Small_Size/Home_Screen_Small_Size_Drawer/home_screen_small_size_drawer_skills_button.dart';

class HomeScreenSmallSizeDrawer extends StatelessWidget {
  const HomeScreenSmallSizeDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: const <Widget>[
        HomeScreenSmallSizeDrawerSkillsButton(),
        HomeScreenSmallSizeDrawerProjectsButton(),
        HomeScreenSmallSizeDrawerExperienceButton(),
        HomeScreenSmallSizeDrawerContactButton()
      ],
    );
  }
}
