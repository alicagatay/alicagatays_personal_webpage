import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class NamelessSecretProject extends StatelessWidget {
  const NamelessSecretProject({Key? key}) : super(key: key);

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
              _launchURL('https://github.com/alicagatay/workout_bot');
            },
            child: const SizedBox(
              width: 800,
              child: Text(
                "Information about this project will be given soon.",
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
