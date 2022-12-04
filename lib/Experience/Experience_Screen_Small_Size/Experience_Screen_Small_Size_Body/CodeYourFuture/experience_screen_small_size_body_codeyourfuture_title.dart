import 'package:flutter/material.dart';

class ExperienceScreenSmallSizeBodyCodeYourFutureTitle extends StatelessWidget {
  const ExperienceScreenSmallSizeBodyCodeYourFutureTitle({super.key});

  @override
  Widget build(BuildContext context) {
    return const Padding(
      padding: EdgeInsets.only(top: 60, left: 30, right: 20),
      child: Text(
        "CodeYourFuture (September 2020 - Present)",
        style: TextStyle(
          fontSize: 33,
          color: Colors.white,
        ),
      ),
    );
  }
}
