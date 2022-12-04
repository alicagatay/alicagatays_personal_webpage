import 'package:flutter/material.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Small_Size/Skills_Screen_Small_Size_Body/skills_screen_small_size_body.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Small_Size/Skills_Screen_Small_Size_Drawer/skills_screen_small_size_drawer_listview.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Small_Size/skills_screen_small_size_appbar.dart';

class SkillsScreenSmallSize extends StatelessWidget {
  const SkillsScreenSmallSize({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      appBar: SkillsScreenSmallSizeAppBar(),
      drawer: SkillsScreenSmallSizeDrawerListView(),
      backgroundColor: Colors.black,
      body: SkillsScreenSmallSizeBody(),
    );
  }
}
