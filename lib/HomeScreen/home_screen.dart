import 'package:flutter/material.dart';
import 'package:personal_website_new/HomeScreen/home_screen_large_size.dart';
import 'package:personal_website_new/HomeScreen/home_screen_small_size.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    if (MediaQuery.of(context).size.width >= 953) {
      return const HomeScreenLargeSize();
    } else {
      return const HomeScreenSmallSize();
    }
  }
}
