import 'package:flutter/material.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Small_Size/Skills_Screen_Small_Size_Body/skills_screen_small_size_body_design_stack/Skills_Screen_Small_Size_Body_Design_Stack_ListView/skills_Screen_small_size_body_design_stack_listview.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Small_Size/Skills_Screen_Small_Size_Body/skills_screen_small_size_body_design_stack/skills_screen_small_size_body_design_stack_title.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Small_Size/Skills_Screen_Small_Size_Body/skills_screen_small_size_body_framework_stack/Skills_Screen_Small_Size_Body_Framework_Stack_ListView/skills_screen_small_size_body_framework_stack_listview.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Small_Size/Skills_Screen_Small_Size_Body/skills_screen_small_size_body_framework_stack/skills_screen_small_size_body_framework_stack_title_1.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Small_Size/Skills_Screen_Small_Size_Body/skills_screen_small_size_body_framework_stack/skills_screen_small_size_body_framework_stack_title_2.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Small_Size/Skills_Screen_Small_Size_Body/skills_screen_small_size_body_tech_stack/Skills_Screen_Small_Size_Body_Tech_Stack_ListView/skills_screen_small_size_body_tech_stack_listview.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Small_Size/Skills_Screen_Small_Size_Body/skills_screen_small_size_body_tech_stack/skills_screen_small_size_body_tech_stack_title.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Small_Size/Skills_Screen_Small_Size_Body/skills_screen_small_size_body_tool_stack/Skills_Screen_Small_Size_Body_Tool_Stack_ListView/skills_screen_small_size_body_tool_stack_listview.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Small_Size/Skills_Screen_Small_Size_Body/skills_screen_small_size_body_tool_stack/skills_screen_small_size_body_tool_stack_title.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Small_Size/Skills_Screen_Small_Size_Body/skills_screen_small_size_scroll_text.dart';

class SkillsScreenSmallSizeBody extends StatelessWidget {
  const SkillsScreenSmallSizeBody({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: const <Widget>[
        SkillsScreenSmallSizeBodyTechStackTitle(),
        SkillsScreenSmallSizeScrollText(),
        SkillsScreenSmallSizeBodyTechStackListView(),
        SkillsScreenSmallSizeBodyFrameworkStackTitle1(),
        SkillsScreenSmallSizeBodyFrameworkStackTitle2(),
        SkillsScreenSmallSizeScrollText(),
        SkillsScreenSmallSizeBodyFrameworkStackListView(),
        SkillsScreenSmallSizeBodyToolStackTitle(),
        SkillsScreenSmallSizeScrollText(),
        SkillsScreenSmallSizeBodyToolStackListView(),
        SkillsScreenSmallSizeBodyDesignStackTitle(),
        SkillsScreenSmallSizeScrollText(),
        SkillsScreenSmallSizeBodyDesignStackListView(),
      ],
    );
  }
}
