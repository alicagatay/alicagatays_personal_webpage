import 'package:flutter/material.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Small_Size/Skills_Screen_Small_Size_Body/skills_screen_small_size_body_tech_stack/Skills_Screen_Small_Size_Body_Tech_Stack_ListView/skills_screen_small_size_body_tech_stack_listview_CSS.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Small_Size/Skills_Screen_Small_Size_Body/skills_screen_small_size_body_tech_stack/Skills_Screen_Small_Size_Body_Tech_Stack_ListView/skills_screen_small_size_body_tech_stack_listview_dart.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Small_Size/Skills_Screen_Small_Size_Body/skills_screen_small_size_body_tech_stack/Skills_Screen_Small_Size_Body_Tech_Stack_ListView/skills_screen_small_size_body_tech_stack_listview_html.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Small_Size/Skills_Screen_Small_Size_Body/skills_screen_small_size_body_tech_stack/Skills_Screen_Small_Size_Body_Tech_Stack_ListView/skills_screen_small_size_body_tech_stack_listview_java.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Small_Size/Skills_Screen_Small_Size_Body/skills_screen_small_size_body_tech_stack/Skills_Screen_Small_Size_Body_Tech_Stack_ListView/skills_screen_small_size_body_tech_stack_listview_javascript.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Small_Size/Skills_Screen_Small_Size_Body/skills_screen_small_size_body_tech_stack/Skills_Screen_Small_Size_Body_Tech_Stack_ListView/skills_screen_small_size_body_tech_stack_listview_matlab.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Small_Size/Skills_Screen_Small_Size_Body/skills_screen_small_size_body_tech_stack/Skills_Screen_Small_Size_Body_Tech_Stack_ListView/skills_screen_small_size_body_tech_stack_listview_postgresql.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Small_Size/Skills_Screen_Small_Size_Body/skills_screen_small_size_body_tech_stack/Skills_Screen_Small_Size_Body_Tech_Stack_ListView/skills_screen_small_size_body_tech_stack_listview_python.dart';

class SkillsScreenSmallSizeBodyTechStackListView extends StatelessWidget {
  const SkillsScreenSmallSizeBodyTechStackListView({super.key});

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
              SkillsScreenSmallSizeBodyTechStackListViewJavaScript(),
              SkillsScreenSmallSizeBodyTechStackListViewPython(),
              SkillsScreenSmallSizeBodyTechStackListViewDart(),
              SkillsScreenSmallSizeBodyTechStackListViewJava(),
              SkillsScreenSmallSizeBodyTechStackListViewHTML(),
              SkillsScreenSmallSizeBodyTechStackListViewCSS(),
              SkillsScreenSmallSizeBodyTechStackListViewPostgreSQL(),
              SkillsScreenSmallSizeBodyTechStackListViewMatlab(),
            ],
          ),
        ),
      ),
    );
  }
}
