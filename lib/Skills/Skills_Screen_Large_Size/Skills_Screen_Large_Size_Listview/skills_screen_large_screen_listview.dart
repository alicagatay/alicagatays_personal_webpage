import 'package:flutter/material.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Large_Size/Skills_Screen_Large_Size_Listview/Skills_Screen_Large_Size_Listview_Framework_Stack/Skills_Screen_Large_Size_Listview_Framework_Stack_Listview/skills_screen_large_screen_listview_framework_stack_listview.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Large_Size/Skills_Screen_Large_Size_Listview/Skills_Screen_Large_Size_Listview_Framework_Stack/skills_screen_large_screen_listview_framework_stack_title.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Large_Size/Skills_Screen_Large_Size_Listview/Skills_Screen_Large_Size_Listview_Tech_Stack/Skills_Screen_Large_Size_Listview_Tech_Stack_Listview/skills_screen_large_screen_listview_tech_stack_listview.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Large_Size/Skills_Screen_Large_Size_Listview/Skills_Screen_Large_Size_Listview_Tech_Stack/skills_screen_large_screen_listview_tech_stack_title.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Large_Size/Skills_Screen_Large_Size_Listview/Skills_Screen_Large_Size_Listview_Tool_Stack/Skills_Screen_Large_Screen_Listview_Tool_Stack_Listview/skills_screen_large_screen_listview_tool_stack_listview.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Large_Size/Skills_Screen_Large_Size_Listview/Skills_Screen_Large_Size_Listview_Tool_Stack/skills_screen_large_screen_listview_tool_stack_title.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Large_Size/Skills_Screen_Large_Size_Listview/skills_screen_large_size_listview_scroll_text.dart';

class SkillsScreenLargeScreenListView extends StatelessWidget {
  const SkillsScreenLargeScreenListView({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: <Widget>[
        const SkillsScreenLargeScreenListViewTechStackTitle(),
        const SkillsScreenLargeSizeListViewScrollText(),
        const SkillsScreenLargeScreenListViewTechStackListView(),
        const SkillsScreenLargeScreenListViewFrameworkStackTitle(),
        const SkillsScreenLargeSizeListViewScrollText(),
        const SkillsScreenLargeScreenListViewFrameworkStackListView(),
        const SkillsScreenLargeScreenListViewToolStackTitle(),
        const SkillsScreenLargeSizeListViewScrollText(),
        const SkillsScreenLargeScreenListViewToolStackListView(),
        const Padding(
          padding: EdgeInsets.only(top: 60, left: 30, right: 30),
          child: Text(
            "Design Stack",
            style: TextStyle(
              fontSize: 50,
              color: Colors.white,
            ),
          ),
        ),
        const SkillsScreenLargeSizeListViewScrollText(),
        Padding(
          padding:
              const EdgeInsets.only(left: 30, right: 30, top: 40, bottom: 80),
          child: Card(
            color: Colors.grey[900],
            child: SizedBox(
              width: MediaQuery.of(context).size.width,
              height: 400,
              child: ListView(
                scrollDirection: Axis.horizontal,
                children: <Widget>[
                  Padding(
                    padding: const EdgeInsets.all(60),
                    child: SizedBox(
                      width: 250,
                      child: Card(
                        color: Colors.grey[800],
                        child: const Center(
                          child: Text(
                            'Affinity Designer',
                            style: TextStyle(
                              fontSize: 30,
                              color: Colors.white,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(60),
                    child: SizedBox(
                      width: 250,
                      child: Card(
                        color: Colors.grey[800],
                        child: const Center(
                          child: Text(
                            'Keynote',
                            style: TextStyle(
                              fontSize: 40,
                              color: Colors.white,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }
}
