import 'package:alicagatays_personal_webpage/Projects/CLI_Study_timer.dart';
import 'package:alicagatays_personal_webpage/Projects/PredictTheNumber.dart';
import 'package:alicagatays_personal_webpage/Projects/SpaceInvaders.dart';
import 'package:flutter/material.dart';
import 'Projects/bookify.dart';
import 'package:url_launcher/url_launcher.dart';

class ProjectsPage extends StatelessWidget {
  const ProjectsPage({Key? key}) : super(key: key);

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
        body: GridView.count(
          crossAxisCount: 2,
          crossAxisSpacing: 50,
          mainAxisSpacing: 50,
          children: <Widget>[
            InkWell(
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => Bookify()),
                );
              },
              child: Card(
                color: Colors.grey[900],
                child: Center(
                  child: Text(
                    "Bookify",
                    style: TextStyle(
                      color: Colors.grey[400],
                      fontSize: 40,
                    ),
                  ),
                ),
              ),
            ),
            InkWell(
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => CliStudyTimer()),
                );
              },
              child: Card(
                color: Colors.grey[900],
                child: Center(
                  child: Text(
                    "CLI Study Timer",
                    style: TextStyle(
                      color: Colors.grey[400],
                      fontSize: 40,
                    ),
                  ),
                ),
              ),
            ),
            InkWell(
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => PredictTheNumber()),
                );
              },
              child: Card(
                color: Colors.grey[900],
                child: Center(
                  child: Text(
                    "Predict The Number",
                    style: TextStyle(
                      color: Colors.grey[400],
                      fontSize: 40,
                    ),
                  ),
                ),
              ),
            ),
            InkWell(
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => SpaceInvaders()),
                );
              },
              child: Card(
                color: Colors.grey[900],
                child: Center(
                  child: Text(
                    "Space Invaders",
                    style: TextStyle(
                      color: Colors.grey[400],
                      fontSize: 40,
                    ),
                  ),
                ),
              ),
            ),
            InkWell(
              onTap: () {
                _launchURL('https://github.com/alicagatay');
              },
              child: Card(
                color: Colors.grey[900],
                child: Center(
                  child: Text(
                    "For more, please visit "
                    "my Github Page",
                    style: TextStyle(
                      color: Colors.grey[400],
                      fontSize: 40,
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
