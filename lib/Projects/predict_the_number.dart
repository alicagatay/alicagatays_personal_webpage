import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class PredictTheNumber extends StatelessWidget {
  const PredictTheNumber({Key? key}) : super(key: key);

  static _launchURL(url) async {
    if (await canLaunchUrl(url)) {
      await launchUrl(url);
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
              _launchURL('https://github.com/alicagatay/Predict-The-Number');
            },
            child: const SizedBox(
              width: 800,
              child: Text(
                "Predict The Number is an Android game I developed while in an internship on summer 2018 using Java. "
                "The main aim of the user in the game is to predict the number that is chosen randomly by the system."
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
