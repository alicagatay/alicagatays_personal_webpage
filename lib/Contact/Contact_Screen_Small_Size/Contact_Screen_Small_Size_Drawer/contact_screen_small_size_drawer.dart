import 'package:flutter/material.dart';
import 'package:personal_website_new/Contact/Contact_Screen_Small_Size/Contact_Screen_Small_Size_Drawer/contact_screen_small_size_drawer_experience_button.dart';
import 'package:personal_website_new/Contact/Contact_Screen_Small_Size/Contact_Screen_Small_Size_Drawer/contact_screen_small_size_drawer_home_button.dart';
import 'package:personal_website_new/Contact/Contact_Screen_Small_Size/Contact_Screen_Small_Size_Drawer/contact_screen_small_size_drawer_projects_button.dart';
import 'package:personal_website_new/Contact/Contact_Screen_Small_Size/Contact_Screen_Small_Size_Drawer/contact_screen_small_size_drawer_skills_button.dart';

class ContactScreenSmallSizeDrawer extends StatelessWidget {
  const ContactScreenSmallSizeDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: const <Widget>[
        ContactScreenSmallSizeDrawerHomeButton(),
        ContactScreenSmallSizeDrawerSkillsButton(),
        ContactScreenSmallSizeDrawerProjectsButton(),
        ContactScreenSmallSizeDrawerExperienceButton(),
      ],
    );
  }
}
