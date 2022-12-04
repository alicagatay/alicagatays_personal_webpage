import 'package:flutter/material.dart';
import 'package:personal_website_new/HomeScreen/Home_Screen_Large_Size/Home_Screen_Large_Size_AppBar/home_screen_large_size_appbar.dart';
import 'package:personal_website_new/HomeScreen/Home_Screen_Large_Size/Home_Screen_Large_Size_Body/home_screen_large_size_body.dart';

class HomeScreenLargeSize extends StatelessWidget {
  const HomeScreenLargeSize({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      appBar: HomeScreenLargeSizeAppBar(),
      backgroundColor: Colors.black,
      body: HomeScreenLargeSizeBody(),
    );
  }
}
