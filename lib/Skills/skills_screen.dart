import 'package:flutter/material.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Large_Size/skills_screen_large_size.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Small_Size/skills_screen_small_size.dart';

class SkillsScreen extends StatelessWidget {
  const SkillsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    if (MediaQuery.of(context).size.width >= 953) {
      return const SkillsScreenLargeSize();
    } else {
      return const SkillsScreenSmallSize();
    }
  }
}
