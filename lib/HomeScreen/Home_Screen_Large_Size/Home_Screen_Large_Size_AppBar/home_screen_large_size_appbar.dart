import 'package:flutter/material.dart';
import 'package:personal_website_new/HomeScreen/Home_Screen_Large_Size/Home_Screen_Large_Size_AppBar/home_screen_large_size_appbar_contact_button.dart';
import 'package:personal_website_new/HomeScreen/Home_Screen_Large_Size/Home_Screen_Large_Size_AppBar/home_screen_large_size_appbar_experience_button.dart';
import 'package:personal_website_new/HomeScreen/Home_Screen_Large_Size/Home_Screen_Large_Size_AppBar/home_screen_large_size_appbar_projects_button.dart';
import 'package:personal_website_new/HomeScreen/Home_Screen_Large_Size/Home_Screen_Large_Size_AppBar/home_screen_large_size_appbar_skills_button.dart';
import 'package:personal_website_new/HomeScreen/Home_Screen_Large_Size/Home_Screen_Large_Size_AppBar/home_screen_large_size_appbar_title.dart';

class HomeScreenLargeSizeAppBar extends StatelessWidget
    with PreferredSizeWidget {
  const HomeScreenLargeSizeAppBar({super.key});

  @override
  Widget build(BuildContext context) {
    return AppBar(
      automaticallyImplyLeading: false,
      toolbarHeight: 80,
      backgroundColor: Colors.grey[900],
      title: const HomeScreenLargeSizeAppBarTitle(),
      actions: const <Widget>[
        HomeScreenLargeSizeAppBarSkillsButton(),
        HomeScreenLargeSizeAppBarProjectsButton(),
        HomeScreenLargeSizeAppBarExperienceButton(),
        HomeScreenLargeSizeAppBarContactButton(),
      ],
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}
