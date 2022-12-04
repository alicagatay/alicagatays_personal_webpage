import 'package:flutter/material.dart';
import 'package:personal_website_new/HomeScreen/Home_Screen_Small_Size/Home_Screen_Small_Size_Body/home_screen_small_size_body_image.dart';
import 'package:personal_website_new/HomeScreen/Home_Screen_Small_Size/Home_Screen_Small_Size_Body/home_screen_small_size_body_intro_text.dart';

class HomeScreenSmallSizeBody extends StatelessWidget {
  const HomeScreenSmallSizeBody({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: const <Widget>[
        HomeScreenSmallSizeBodyIntroText(),
        HomeScreenSmallSizeBodyImage()
      ],
    );
  }
}
