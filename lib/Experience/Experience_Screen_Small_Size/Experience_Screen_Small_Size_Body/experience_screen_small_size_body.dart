import 'package:flutter/material.dart';
import 'package:personal_website_new/Experience/Experience_Screen_Small_Size/Experience_Screen_Small_Size_Body/CodeYourFuture/experience_screen_small_size_body_codeyourfuture_description.dart';
import 'package:personal_website_new/Experience/Experience_Screen_Small_Size/Experience_Screen_Small_Size_Body/CodeYourFuture/experience_screen_small_size_body_codeyourfuture_role.dart';
import 'package:personal_website_new/Experience/Experience_Screen_Small_Size/Experience_Screen_Small_Size_Body/CodeYourFuture/experience_screen_small_size_body_codeyourfuture_title.dart';

class ExperienceScreenSmallSizeBody extends StatelessWidget {
  const ExperienceScreenSmallSizeBody({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: const <Widget>[
        ExperienceScreenSmallSizeBodyCodeYourFutureTitle(),
        ExperienceScreenSmallSizeBodyCodeYourFutureRole(),
        ExperienceScreenSmallSizeBodyCodeYourFutureDescription(),
      ],
    );
  }
}
