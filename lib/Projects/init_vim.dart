import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class InitVim extends StatelessWidget {
  const InitVim({Key? key}) : super(key: key);

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
              _launchURL('https://github.com/alicagatay/init.vim');
            },
            child: const SizedBox(
              width: 800,
              child: Text(
                "init.vim is my minimal and productive go to Neovim "
                "configuration I use on my computer while programming. "
                "It is meant to start up instantly and it contains stuff "
                "that helps me become more productive while programming.",
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
