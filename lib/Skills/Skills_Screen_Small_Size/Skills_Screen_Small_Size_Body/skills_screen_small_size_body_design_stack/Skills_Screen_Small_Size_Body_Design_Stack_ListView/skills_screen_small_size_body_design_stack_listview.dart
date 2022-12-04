import 'package:flutter/material.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Small_Size/Skills_Screen_Small_Size_Body/skills_screen_small_size_body_design_stack/Skills_Screen_Small_Size_Body_Design_Stack_ListView/skills_screen_small_size_body_design_stack_listview_affinitydesigner.dart';
import 'package:personal_website_new/Skills/Skills_Screen_Small_Size/Skills_Screen_Small_Size_Body/skills_screen_small_size_body_design_stack/Skills_Screen_Small_Size_Body_Design_Stack_ListView/skills_screen_small_size_body_design_stack_listview_keynote.dart';

class SkillsScreenSmallSizeBodyDesignStackListView extends StatelessWidget {
  const SkillsScreenSmallSizeBodyDesignStackListView({super.key});

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
              SkillsScreenSmallSizeBodyDesignStackListViewAffinityDesigner(),
              SkillsScreenSmallSizeBodyDesignStackListViewKeynote(),
            ],
          ),
        ),
      ),
    );
  }
}
