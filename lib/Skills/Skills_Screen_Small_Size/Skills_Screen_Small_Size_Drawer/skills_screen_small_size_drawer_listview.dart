import 'package:flutter/material.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Small_Size/Skills_Screen_Small_Size_Drawer/skills_screen_small_size_drawer_listview_contact_button.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Small_Size/Skills_Screen_Small_Size_Drawer/skills_screen_small_size_drawer_listview_experience_button.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Small_Size/Skills_Screen_Small_Size_Drawer/skills_screen_small_size_drawer_listview_homescreen_button.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Small_Size/Skills_Screen_Small_Size_Drawer/skills_screen_small_size_drawer_listview_projects_button.dart';

class SkillsScreenSmallSizeDrawerListView extends StatelessWidget {
  const SkillsScreenSmallSizeDrawerListView({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: const <Widget>[
        SkillsScreenSmallSizeDrawerListViewHomeScreenButton(),
        SkillsScreenSmallSizeDrawerListViewProjectsButton(),
        SkillsScreenSmallSizeDrawerListViewExperienceButton(),
        SkillsScreenSmallSizeDrawerListViewContactButton()
      ],
    );
  }
}
