import 'package:flutter/material.dart';

class AboutPage extends StatelessWidget {
  const AboutPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: Scaffold(
        backgroundColor: Colors.black,
        body: Center(
          child: SizedBox(
            width: 700,
            child: Text(
              "Hi there, I'm Ali! "
              "I'm a 3rd year Computer Science student at the University of Birmingham. "
              "I'm mainly interested in machine learning, artificial intelligence, and software development"
              "In my free times, I love to work out, listen to music, or listen to a podcast. "
              "My favorite programming language is Python, and my favorite toolkit is Flutter. ",
              style: TextStyle(
                fontSize: 30,
                color: Colors.white,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
