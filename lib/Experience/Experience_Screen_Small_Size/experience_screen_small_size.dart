import 'package:flutter/material.dart';
import 'package:personal_website_new/Experience/Experience_Screen_Small_Size/Experience_Screen_Small_Size_Body/experience_screen_small_size_body.dart';
import 'package:personal_website_new/Experience/Experience_Screen_Small_Size/Experience_Screen_Small_Size_Drawer/experience_screen_small_size_drawer.dart';
import 'package:personal_website_new/Experience/Experience_Screen_Small_Size/experience_screen_small_size_appbar.dart';

class ExperienceScreenSmallSize extends StatelessWidget {
  const ExperienceScreenSmallSize({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      appBar: ExperienceScreenSmallSizeAppBar(),
      drawer: ExperienceScreenSmallSizeDrawer(),
      backgroundColor: Colors.black,
      body: ExperienceScreenSmallSizeBody(),
    );
  }
}
