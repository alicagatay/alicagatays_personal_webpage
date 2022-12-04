import 'package:flutter/material.dart';
import 'package:personal_website_new/HomeScreen/Home_Screen_Small_Size/Home_Screen_Small_Size_Body/home_screen_small_size_body.dart';
import 'package:personal_website_new/HomeScreen/Home_Screen_Small_Size/Home_Screen_Small_Size_Drawer/home_screen_small_size_drawer.dart';
import 'package:personal_website_new/HomeScreen/Home_Screen_Small_Size/home_screen_small_size_appbar.dart';

class HomeScreenSmallSize extends StatelessWidget {
  const HomeScreenSmallSize({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      appBar: HomeScreenSmallSizeAppBar(),
      drawer: HomeScreenSmallSizeDrawer(),
      backgroundColor: Colors.black,
      body: HomeScreenSmallSizeBody(),
    );
  }
}
