import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class SpaceInvaders extends StatelessWidget {
  const SpaceInvaders({Key? key}) : super(key: key);

  static _launchURL(url) async {
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      throw 'Could not launch $url';
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        backgroundColor: Colors.black,
        body: Center(
          child: InkWell(
            onDoubleTap: () {
              Navigator.pop(context);
            },
            onTap: () {
              _launchURL('https://github.com/alicagatay/Space-Invaders');
            },
            child: const SizedBox(
              width: 800,
              child: Text(
                "Space Invaders is a game I developed using Processing. "
                "It is basically the copy of the original Space Invaders, "
                "just programmed in a different programming language."
                "To learn more about it, you can visit the project's GitHub page by pressing into this text, "
                "or you can double press this text in order to return to the previous page.",
                style: TextStyle(
                  fontSize: 30,
                  color: Colors.white,
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
