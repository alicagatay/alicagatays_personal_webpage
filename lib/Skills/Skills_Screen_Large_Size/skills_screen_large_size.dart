import 'package:flutter/material.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Large_Size/Skills_Screen_Large_Size_Appbar/skills_screen_large_screen_appbar.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Large_Size/Skills_Screen_Large_Size_Listview/skills_screen_large_screen_listview.dart';

class SkillsScreenLargeSize extends StatelessWidget {
  const SkillsScreenLargeSize({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
        appBar: SkillsScreenLargeSizeAppBar(),
        backgroundColor: Colors.black,
        body: SkillsScreenLargeScreenListView());
  }
}
