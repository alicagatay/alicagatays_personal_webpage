import 'package:alicagatays_personal_webpage/home_page.dart';
import 'package:flutter/material.dart';

class AboutPage extends StatelessWidget {
  const AboutPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        backgroundColor: Colors.black,
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: <Widget>[
              const SizedBox(
                width: 700,
                child: Text(
                    "Hi there, my name is Ali. "
                    "I am a software developer based in Birmingham, UK. "
                    "I am mainly interested in machine learning, artificial intelligence, "
                    "and software development. In my free times, I love working out, listening to music, "
                    "and program. My favorite programming language is Python, and my favorite toolkit "
                    "is Flutter.",
                  style: TextStyle(
                    fontSize: 30,
                    color: Colors.white,
                  ),
                ),
              ),
              InkWell(
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const HomePage()),
                  );
                },
                child: SizedBox(
                  width: 250,
                  height: 120,
                  child: Card(
                    color: Colors.grey[900],
                    child: Center(
                      child: Text(
                        "Click to return home",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: Colors.grey[400],
                          fontSize: 30,
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
