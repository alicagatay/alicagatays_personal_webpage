import 'package:flutter/material.dart';
import 'package:personal_website_new/Contact/Contact_Screen_Large_Size/Contact_Screen_Large_Size_Appbar/contact_screen_large_size_appbar_experience_button.dart';
import 'package:personal_website_new/Contact/Contact_Screen_Large_Size/Contact_Screen_Large_Size_Appbar/contact_screen_large_size_appbar_home_button.dart';
import 'package:personal_website_new/Contact/Contact_Screen_Large_Size/Contact_Screen_Large_Size_Appbar/contact_screen_large_size_appbar_projects_button.dart';
import 'package:personal_website_new/Contact/Contact_Screen_Large_Size/Contact_Screen_Large_Size_Appbar/contact_screen_large_size_appbar_skills_button.dart';
import 'package:personal_website_new/Contact/Contact_Screen_Large_Size/Contact_Screen_Large_Size_Appbar/contact_screen_large_size_appbar_title.dart';

class ContactScreenLargeSizeAppBar extends StatelessWidget
    with PreferredSizeWidget {
  const ContactScreenLargeSizeAppBar({super.key});

  @override
  Widget build(BuildContext context) {
    return AppBar(
      automaticallyImplyLeading: false,
      toolbarHeight: 80,
      backgroundColor: Colors.grey[900],
      title: const ContactScreenLargeSizeAppBarTitle(),
      actions: const <Widget>[
        ContactScreenLargeSizeAppBarHomeButton(),
        ContactScreenLargeSizeAppBarSkillsButton(),
        ContactScreenLargeSizeAppBarProjectsButton(),
        ContactScreenLargeSizeAppBarExperienceButton(),
      ],
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}
