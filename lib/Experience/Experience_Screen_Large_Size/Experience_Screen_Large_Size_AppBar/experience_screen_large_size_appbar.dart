import 'package:flutter/material.dart';
import 'package:personal_website_new/Experience/Experience_Screen_Large_Size/Experience_Screen_Large_Size_AppBar/experience_screen_large_size_appbar_contacts_button.dart';
import 'package:personal_website_new/Experience/Experience_Screen_Large_Size/Experience_Screen_Large_Size_AppBar/experience_screen_large_size_appbar_home_button.dart';
import 'package:personal_website_new/Experience/Experience_Screen_Large_Size/Experience_Screen_Large_Size_AppBar/experience_screen_large_size_appbar_projects_button.dart';
import 'package:personal_website_new/Experience/Experience_Screen_Large_Size/Experience_Screen_Large_Size_AppBar/experience_screen_large_size_appbar_skills_button.dart';

class ExperienceScreenLargeSizeAppBar extends StatelessWidget
    with PreferredSizeWidget {
  const ExperienceScreenLargeSizeAppBar({super.key});

  @override
  Widget build(BuildContext context) {
    return AppBar(
      automaticallyImplyLeading: false,
      toolbarHeight: 80,
      backgroundColor: Colors.grey[900],
      title: Text(
        "Ali Cagatay",
        style: TextStyle(
          fontSize: 35,
          fontWeight: FontWeight.w400,
          color: Colors.grey[300],
        ),
      ),
      actions: const <Widget>[
        ExperienceScreenLargeSizeAppBarHomeButton(),
        ExperienceScreenLargeSizeAppBarSkillsButton(),
        ExperienceScreenLargeSizeAppBarProjectsButton(),
        ExperienceScreenLargeSizeAppBarContactsButton(),
      ],
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(80);
}
