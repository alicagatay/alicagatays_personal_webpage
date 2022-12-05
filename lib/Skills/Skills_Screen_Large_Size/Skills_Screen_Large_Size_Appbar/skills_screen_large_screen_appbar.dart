import 'package:flutter/material.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Large_Size/Skills_Screen_Large_Size_Appbar/skills_screen_large_screen_appbar_contact_button.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Large_Size/Skills_Screen_Large_Size_Appbar/skills_screen_large_screen_appbar_experience_button.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Large_Size/Skills_Screen_Large_Size_Appbar/skills_screen_large_screen_appbar_home_action_button.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Large_Size/Skills_Screen_Large_Size_Appbar/skills_screen_large_screen_appbar_projects_button.dart';

class SkillsScreenLargeSizeAppBar extends StatelessWidget
    with PreferredSizeWidget {
  const SkillsScreenLargeSizeAppBar({super.key});

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
        SkillsScreenLargeScreenAppbarHomeActionButton(),
        SkillsScreenLargeScreenAppbarProjectsButton(),
        SkillsScreenLargeScreenAppbarExperienceButton(),
        SkillsScreenLargeScreenAppbarContactButton()
      ],
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(80);
}
