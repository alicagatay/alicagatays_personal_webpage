import 'package:flutter/material.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Large_Size/Skills_Screen_Large_Size_Listview/Skills_Screen_Large_Size_Listview_Tool_Stack/Skills_Screen_Large_Screen_Listview_Tool_Stack_Listview/skills_screen_large_screen_listview_tool_stack_listview_code.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Large_Size/Skills_Screen_Large_Size_Listview/Skills_Screen_Large_Size_Listview_Tool_Stack/Skills_Screen_Large_Screen_Listview_Tool_Stack_Listview/skills_screen_large_screen_listview_tool_stack_listview_docker.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Large_Size/Skills_Screen_Large_Size_Listview/Skills_Screen_Large_Size_Listview_Tool_Stack/Skills_Screen_Large_Screen_Listview_Tool_Stack_Listview/skills_screen_large_screen_listview_tool_stack_listview_git.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Large_Size/Skills_Screen_Large_Size_Listview/Skills_Screen_Large_Size_Listview_Tool_Stack/Skills_Screen_Large_Screen_Listview_Tool_Stack_Listview/skills_screen_large_screen_listview_tool_stack_listview_jetbrains.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Large_Size/Skills_Screen_Large_Size_Listview/Skills_Screen_Large_Size_Listview_Tool_Stack/Skills_Screen_Large_Screen_Listview_Tool_Stack_Listview/skills_screen_large_screen_listview_tool_stack_listview_postman.dart';

class SkillsScreenLargeScreenListViewToolStackListView extends StatelessWidget {
  const SkillsScreenLargeScreenListViewToolStackListView({super.key});

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
              SkillsScreenLargeScreenListViewToolStackListViewGit(),
              SkillsScreenLargeScreenListViewToolStackListViewDocker(),
              SkillsScreenLargeScreenListViewToolStackListViewJetBrains(),
              SkillsScreenLargeScreenListViewToolStackListViewCode(),
              SkillsScreenLArgeScreenListViewToolStackListViewPostman(),
            ],
          ),
        ),
      ),
    );
  }
}
