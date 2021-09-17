import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class ContactsPage extends StatelessWidget {
  const ContactsPage({Key? key}) : super(key: key);

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
          child: Container(
            height: 600,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: <Widget>[
                Text(
                  "contact with me:",
                  style: TextStyle(
                    fontSize: 60,
                    color: Colors.white,
                  ),
                ),
                InkWell(
                  onTap: () {
                    _launchURL("mailto:aliccagatay@gmail.com");
                  },
                  child: Text(
                    "email: aliccagatay@gmail.com",
                    style: TextStyle(
                      fontSize: 30,
                      color: Colors.white,
                    ),
                  ),
                ),
                InkWell(
                  onTap: () {
                    _launchURL("https://github.com/alicagatay");
                  },
                  child: Text(
                    "github: alicagatay",
                    style: TextStyle(
                      fontSize: 30,
                      color: Colors.white,
                    ),
                  ),
                ),
                InkWell(
                  onTap: () {
                    _launchURL("https://www.linkedin.com/in/alicagatay");
                  },
                  child: Text(
                    "linkedin: Ali Çağatay",
                    style: TextStyle(
                      fontSize: 30,
                      color: Colors.white,
                    ),
                  ),
                ),
                InkWell(
                  onTap: () {
                    _launchURL(
                        "https://docs.google.com/document/d/1QUSOAHbH_91jsgYviYTWRWGn3NGqcvwl/edit?usp=sharing&ouid=116963885626306843574&rtpof=true&sd=true");
                  },
                  child: Text(
                    "click to view my resume.",
                    style: TextStyle(
                      fontSize: 30,
                      color: Colors.white,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
