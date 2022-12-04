import 'package:flutter/material.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Large_Size/Skills_Screen_Large_Size_Listview/Skills_Screen_Large_Size_Listview_Framework_Stack/Skills_Screen_Large_Size_Listview_Framework_Stack_Listview/Skills_Screen_Large_Screen_ListView_Framework_Stack_ListView/skills_screen_large_screen_listview_framework_stack_listview_django.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Large_Size/Skills_Screen_Large_Size_Listview/Skills_Screen_Large_Size_Listview_Framework_Stack/Skills_Screen_Large_Size_Listview_Framework_Stack_Listview/Skills_Screen_Large_Screen_ListView_Framework_Stack_ListView/skills_screen_large_screen_listview_framework_stack_listview_flutter.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Large_Size/Skills_Screen_Large_Size_Listview/Skills_Screen_Large_Size_Listview_Framework_Stack/Skills_Screen_Large_Size_Listview_Framework_Stack_Listview/Skills_Screen_Large_Screen_ListView_Framework_Stack_ListView/skills_screen_large_screen_listview_framework_stack_listview_nltk.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Large_Size/Skills_Screen_Large_Size_Listview/Skills_Screen_Large_Size_Listview_Framework_Stack/Skills_Screen_Large_Size_Listview_Framework_Stack_Listview/Skills_Screen_Large_Screen_ListView_Framework_Stack_ListView/skills_screen_large_screen_listview_framework_stack_listview_pytorch.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Large_Size/Skills_Screen_Large_Size_Listview/Skills_Screen_Large_Size_Listview_Framework_Stack/Skills_Screen_Large_Size_Listview_Framework_Stack_Listview/Skills_Screen_Large_Screen_ListView_Framework_Stack_ListView/skills_screen_large_screen_listview_framework_stack_listview_react.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Large_Size/Skills_Screen_Large_Size_Listview/Skills_Screen_Large_Size_Listview_Framework_Stack/Skills_Screen_Large_Size_Listview_Framework_Stack_Listview/Skills_Screen_Large_Screen_ListView_Framework_Stack_ListView/skills_screen_large_screen_listview_framework_stack_listview_tensorflow.dart';

class SkillsScreenLargeScreenListViewFrameworkStackListView
    extends StatelessWidget {
  const SkillsScreenLargeScreenListViewFrameworkStackListView({super.key});

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
              SkillsScreenLargeScreenListViewFrameworkStackListViewFlutter(),
              SkillsScreenLargeScreenListViewFrameworkStackListViewDjango(),
              SkillsScreenLargeScreenListViewFrameworkStackListViewReact(),
              SkillsScreenLargeScreenListViewFrameworkStackListViewTensorflow(),
              SkillsScreenLargeScreenListViewFrameworkStackListViewPyTorch(),
              SkillsScreenLargeScreenListViewFrameworkStackListViewNLTK()
            ],
          ),
        ),
      ),
    );
  }
}
