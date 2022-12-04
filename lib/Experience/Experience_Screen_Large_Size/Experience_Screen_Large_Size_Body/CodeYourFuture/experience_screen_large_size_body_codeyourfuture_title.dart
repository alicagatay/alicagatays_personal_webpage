import 'package:flutter/material.dart';

class ExperienceScreenLargeSizeBodyCodeYourFutureTitle extends StatelessWidget {
  const ExperienceScreenLargeSizeBodyCodeYourFutureTitle({super.key});

  @override
  Widget build(BuildContext context) {
    return const Padding(
      padding: EdgeInsets.only(top: 60, left: 30, right: 30),
      child: Text(
        "CodeYourFuture (September 2020 - Present)",
        style: TextStyle(
          fontSize: 50,
          color: Colors.white,
        ),
      ),
    );
  }
}
