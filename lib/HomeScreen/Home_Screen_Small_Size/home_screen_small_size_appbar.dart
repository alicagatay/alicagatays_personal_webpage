import 'package:flutter/material.dart';

class HomeScreenSmallSizeAppBar extends StatelessWidget
    with PreferredSizeWidget {
  const HomeScreenSmallSizeAppBar({super.key});

  @override
  Widget build(BuildContext context) {
    return AppBar(
      automaticallyImplyLeading: true,
      toolbarHeight: 80,
      backgroundColor: Colors.grey[900],
      title: Text(
        "Ali Cagatay",
        style: TextStyle(
          fontSize: 35,
          fontWeight: FontWeight.w400,
          color: Colors.grey[300],
        ),
      ),
      centerTitle: true,
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(80);
}