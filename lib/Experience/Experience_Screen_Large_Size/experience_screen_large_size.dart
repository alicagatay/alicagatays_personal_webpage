import 'package:flutter/material.dart';
import 'package:personal_website_new/Experience/Experience_Screen_Large_Size/Experience_Screen_Large_Size_AppBar/experience_screen_large_size_appbar.dart';
import 'package:personal_website_new/Experience/Experience_Screen_Large_Size/Experience_Screen_Large_Size_Body/experience_screen_large_size_Body.dart';

class ExperienceScreenLargeSize extends StatelessWidget {
  const ExperienceScreenLargeSize({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      appBar: ExperienceScreenLargeSizeAppBar(),
      backgroundColor: Colors.black,
      body: ExperienceScreenLargeSizeBody(),
    );
  }
}
