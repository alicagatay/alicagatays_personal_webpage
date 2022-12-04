import 'package:flutter/material.dart';

class HomeScreenSmallSizeBodyIntroText extends StatelessWidget {
  const HomeScreenSmallSizeBodyIntroText({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 80, horizontal: 10),
      child: Card(
        color: Colors.grey[900],
        child: const Padding(
          padding: EdgeInsets.all(80),
          child: Text(
            "Hi there, my name is Ali. "
            "I am a software developer based in Birmingham, UK. "
            "I am mainly interested in full stack web development and mobile application development. "
            "In my free times, I love working out, listening to music, "
            "and program. My favorite programming language is JavaScript, and my favorite framework "
            "is Flutter.",
            style: TextStyle(
              color: Colors.white,
              fontSize: 20,
            ),
          ),
        ),
      ),
    );
  }
}
