import 'package:flutter/material.dart';

class HomeScreenLargeSizeBodyAboutMePicture extends StatelessWidget {
  const HomeScreenLargeSizeBodyAboutMePicture({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        width: 350,
        height: 350,
        decoration: const BoxDecoration(
          shape: BoxShape.circle,
          image: DecorationImage(
              image: NetworkImage(
                'https://avatars.githubusercontent.com/u/29245767?v=4',
              ),
              fit: BoxFit.fill),
        ),
      ),
    );
  }
}
