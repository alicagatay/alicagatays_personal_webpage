import 'package:flutter/material.dart';
import 'package:personal_website_new/HomeScreen/Home_Screen_Large_Size/Home_Screen_Large_Size_Body/home_screen_large_size_body_aboutmeinfo.dart';
import 'package:personal_website_new/HomeScreen/Home_Screen_Large_Size/Home_Screen_Large_Size_Body/home_screen_large_size_body_aboutmepicture.dart';

class HomeScreenLargeSizeBody extends StatelessWidget {
  const HomeScreenLargeSizeBody({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: const <Widget>[
        HomeScreenLargeSizeBodyAboutMeInfo(),
        HomeScreenLargeSizeBodyAboutMePicture(),
      ],
    );
  }
}
