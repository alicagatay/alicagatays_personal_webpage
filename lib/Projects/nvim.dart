import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class Nvim extends StatelessWidget {
  const Nvim({Key? key}) : super(key: key);

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
              _launchURL('https://github.com/alicagatay/nvim');
            },
            child: const SizedBox(
              width: 800,
              child: Text(
                "Nvim is a git repository that contains my Neovim configuration. "
                "It is compatible with devices using Neovim 0.6.0 or newer.",
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
