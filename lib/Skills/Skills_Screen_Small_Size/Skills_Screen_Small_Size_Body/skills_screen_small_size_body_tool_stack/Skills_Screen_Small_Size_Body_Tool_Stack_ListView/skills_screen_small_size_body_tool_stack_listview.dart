import 'package:flutter/material.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Small_Size/Skills_Screen_Small_Size_Body/skills_screen_small_size_body_tool_stack/Skills_Screen_Small_Size_Body_Tool_Stack_ListView/skills_screen_small_size_body_tool_stack_listview_code.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Small_Size/Skills_Screen_Small_Size_Body/skills_screen_small_size_body_tool_stack/Skills_Screen_Small_Size_Body_Tool_Stack_ListView/skills_screen_small_size_body_tool_stack_listview_docker.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Small_Size/Skills_Screen_Small_Size_Body/skills_screen_small_size_body_tool_stack/Skills_Screen_Small_Size_Body_Tool_Stack_ListView/skills_screen_small_size_body_tool_stack_listview_git.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Small_Size/Skills_Screen_Small_Size_Body/skills_screen_small_size_body_tool_stack/Skills_Screen_Small_Size_Body_Tool_Stack_ListView/skills_screen_small_size_body_tool_stack_listview_jetbrains.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Small_Size/Skills_Screen_Small_Size_Body/skills_screen_small_size_body_tool_stack/Skills_Screen_Small_Size_Body_Tool_Stack_ListView/skills_screen_small_size_body_tool_stack_listview_postman.dart';

class SkillsScreenSmallSizeBodyToolStackListView extends StatelessWidget {
  const SkillsScreenSmallSizeBodyToolStackListView({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(left: 30, right: 30, top: 40, bottom: 80),
      child: Card(
        color: Colors.grey[900],
        child: SizedBox(
          width: MediaQuery.of(context).size.width,
          height: 400,
          child: ListView(
            scrollDirection: Axis.horizontal,
            children: const <Widget>[
              SkillsScreenSmallSizeBodyToolStackListViewGit(),
              SkillsScreenSmallSizeBodyToolStackListViewDocker(),
              SkillsScreenSmallSizeBodyToolStackListViewJetbrains(),
              SkillsScreenSmallSizeBodyToolStackListViewVSCode(),
              SkillsScreenSmallSizeBodyToolStackListViewPostman(),
            ],
          ),
        ),
      ),
    );
  }
}
