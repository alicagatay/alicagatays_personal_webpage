import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class Bookify extends StatelessWidget {
  const Bookify({Key? key}) : super(key: key);

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
              _launchURL('https://github.com/alicagatay/bookify');
            },
            child: const SizedBox(
              width: 800,
              child: Text(
                "This app is in development, info will come soon once the first version is finished.",
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
