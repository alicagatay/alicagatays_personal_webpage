import 'package:flutter/material.dart';
import 'package:personal_website_new/Experience/Experience_Screen_Large_Size/Experience_Screen_Large_Size_Body/CodeYourFuture/experience_screen_large_size_body_codeyourfuture_description.dart';
import 'package:personal_website_new/Experience/Experience_Screen_Large_Size/Experience_Screen_Large_Size_Body/CodeYourFuture/experience_screen_large_size_body_codeyourfuture_role.dart';
import 'package:personal_website_new/Experience/Experience_Screen_Large_Size/Experience_Screen_Large_Size_Body/CodeYourFuture/experience_screen_large_size_body_codeyourfuture_title.dart';

class ExperienceScreenLargeSizeBody extends StatelessWidget {
  const ExperienceScreenLargeSizeBody({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: const <Widget>[
        ExperienceScreenLargeSizeBodyCodeYourFutureTitle(),
        ExperienceScreenLargeSizeBodyCodeYourFutureRole(),
        ExperienceScreenLargeSizeBodyCodeYourFutureDescription(),
      ],
    );
  }
}
