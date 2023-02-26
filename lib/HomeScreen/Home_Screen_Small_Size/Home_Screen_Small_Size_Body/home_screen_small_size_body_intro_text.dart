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
            'Hi there, my name is Ali. I am a software engineer '
            'from Birmingham, United Kingdom who generally enjoys '
            'building stuff: be it a full stack web page, a cross '
            'platform mobile application, or an API that people can '
            'use on their backend services. I have strong technical '
            'skills and background in software engineering, machine '
            'learning and problem solving. In my university studies, '
            'I have studied a variation of subjects such as machine '
            'learning, data structures & algorithms, computer vision, '
            'and mobile & ubiquitous computing. Other than '
            'that, for the last 2 and a half years I am also volunteering at '
            'CodeYourFuture, a school that offers career-focused software '
            'development training to refugees and people from low-income '
            'backgrounds, as a technical assistant and teaching lead in order '
            'to teach full stack web development to its trainees using '
            'technologies such as HTML, CSS, JavaScript, React.js, Node.js and PostgreSQL.',
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
