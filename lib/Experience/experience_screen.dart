import 'package:flutter/material.dart';
import 'package:personal_website_new/Experience/Experience_Screen_Large_Size/experience_screen_large_size.dart';
import 'package:personal_website_new/Experience/Experience_Screen_Small_Size/experience_screen_small_size.dart';

class ExperienceScreen extends StatelessWidget {
  const ExperienceScreen({super.key});

  @override
  Widget build(BuildContext context) {
    if (MediaQuery.of(context).size.width >= 953) {
      return const ExperienceScreenLargeSize();
    } else {
      return const ExperienceScreenSmallSize();
    }
  }
}
