import 'package:flutter/material.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Small_Size/Skills_Screen_Small_Size_Body/skills_screen_small_size_body_framework_stack/Skills_Screen_Small_Size_Body_Framework_Stack_ListView/skills_screen_small_size_body_framework_stack_listview_django.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Small_Size/Skills_Screen_Small_Size_Body/skills_screen_small_size_body_framework_stack/Skills_Screen_Small_Size_Body_Framework_Stack_ListView/skills_screen_small_size_body_framework_stack_listview_flutter.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Small_Size/Skills_Screen_Small_Size_Body/skills_screen_small_size_body_framework_stack/Skills_Screen_Small_Size_Body_Framework_Stack_ListView/skills_screen_small_size_body_framework_stack_listview_name_pytorch.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Small_Size/Skills_Screen_Small_Size_Body/skills_screen_small_size_body_framework_stack/Skills_Screen_Small_Size_Body_Framework_Stack_ListView/skills_screen_small_size_body_framework_stack_listview_nltk.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Small_Size/Skills_Screen_Small_Size_Body/skills_screen_small_size_body_framework_stack/Skills_Screen_Small_Size_Body_Framework_Stack_ListView/skills_screen_small_size_body_framework_stack_listview_react_js.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Small_Size/Skills_Screen_Small_Size_Body/skills_screen_small_size_body_framework_stack/Skills_Screen_Small_Size_Body_Framework_Stack_ListView/skills_screen_small_size_body_framework_stack_listview_tensorflow.dart';

class SkillsScreenSmallSizeBodyFrameworkStackListView extends StatelessWidget {
  const SkillsScreenSmallSizeBodyFrameworkStackListView({super.key});

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
              SkillsScreenSmallSizeBodyFrameworkStackListViewFlutter(),
              SkillsScreenSmallSizeBodyFrameworkStackListViewDjango(),
              SkillsScreenSmallSizeBodyFrameworkStackListViewReactJS(),
              SkillsScreenSmallSizeBodyFrameworkStackListViewTensorflow(),
              SkillsScreenSmallSizeBodyFrameworkStackListViewPyTorch(),
              SkillsScreenSmallSizeBodyFrameworkStackListViewNLTK(),
            ],
          ),
        ),
      ),
    );
  }
}