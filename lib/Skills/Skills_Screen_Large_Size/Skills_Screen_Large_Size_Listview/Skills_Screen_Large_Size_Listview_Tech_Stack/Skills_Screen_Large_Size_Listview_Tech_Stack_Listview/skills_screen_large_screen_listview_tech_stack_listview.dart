import 'package:flutter/material.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Large_Size/Skills_Screen_Large_Size_Listview/Skills_Screen_Large_Size_Listview_Tech_Stack/Skills_Screen_Large_Size_Listview_Tech_Stack_Listview/skills_screen_large_screen_listview_tech_stack_listview_css.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Large_Size/Skills_Screen_Large_Size_Listview/Skills_Screen_Large_Size_Listview_Tech_Stack/Skills_Screen_Large_Size_Listview_Tech_Stack_Listview/skills_screen_large_screen_listview_tech_stack_listview_dart.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Large_Size/Skills_Screen_Large_Size_Listview/Skills_Screen_Large_Size_Listview_Tech_Stack/Skills_Screen_Large_Size_Listview_Tech_Stack_Listview/skills_screen_large_screen_listview_tech_stack_listview_html.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Large_Size/Skills_Screen_Large_Size_Listview/Skills_Screen_Large_Size_Listview_Tech_Stack/Skills_Screen_Large_Size_Listview_Tech_Stack_Listview/skills_screen_large_screen_listview_tech_stack_listview_java.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Large_Size/Skills_Screen_Large_Size_Listview/Skills_Screen_Large_Size_Listview_Tech_Stack/Skills_Screen_Large_Size_Listview_Tech_Stack_Listview/skills_screen_large_screen_listview_tech_stack_listview_javascript.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Large_Size/Skills_Screen_Large_Size_Listview/Skills_Screen_Large_Size_Listview_Tech_Stack/Skills_Screen_Large_Size_Listview_Tech_Stack_Listview/skills_screen_large_screen_listview_tech_stack_listview_matlab.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Large_Size/Skills_Screen_Large_Size_Listview/Skills_Screen_Large_Size_Listview_Tech_Stack/Skills_Screen_Large_Size_Listview_Tech_Stack_Listview/skills_screen_large_screen_listview_tech_stack_listview_postgresql.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Large_Size/Skills_Screen_Large_Size_Listview/Skills_Screen_Large_Size_Listview_Tech_Stack/Skills_Screen_Large_Size_Listview_Tech_Stack_Listview/skills_screen_large_screen_listview_tech_stack_listview_python.dart';

class SkillsScreenLargeScreenListViewTechStackListView extends StatelessWidget {
  const SkillsScreenLargeScreenListViewTechStackListView({super.key});

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
              SkillsScreenLargeScreenListViewTechStackListViewJavaScript(),
              SkillsScreenLargeScreenListViewTechStackListViewPython(),
              SkillsScreenLargeScreenListViewTechStackListViewDart(),
              SkillsScreenLargeScreenListViewTechStackListViewJava(),
              SkillsScreenLargeScreenListViewTechStackListViewHTML(),
              SkillsScreenLargeScreenListViewTechStackListViewCSS(),
              SkillsScreenLargeScreenListViewTechStackListViewPostgreSQL(),
              SkillsScreenLargeScreenListViewTechStackListViewMatlab(),
            ],
          ),
        ),
      ),
    );
  }
}
