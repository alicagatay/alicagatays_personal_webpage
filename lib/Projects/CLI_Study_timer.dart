import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class CliStudyTimer extends StatelessWidget {
  const CliStudyTimer({Key? key}) : super(key: key);

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
            onTap: () {
              _launchURL('https://github.com/alicagatay/CLI-Study-Timer');
            },
            child: Container(
              width: 800,
              child: Text(
                "CLI Study Timer is a command line application I developed using Python. "
                "In it, you can setup famous study timers such as Pomodoro and 5417, "
                "or you can set a study timer from scratch. To learn more about the project, "
                "click into this text.",
                style: TextStyle(
                  fontSize: 40,
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
