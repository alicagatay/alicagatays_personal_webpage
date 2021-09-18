import 'package:alicagatays_personal_webpage/Projects/cli_study_timer.dart';
import 'package:alicagatays_personal_webpage/Projects/predict_the_number.dart';
import 'package:alicagatays_personal_webpage/Projects/space_invaders.dart';
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
                  MaterialPageRoute(builder: (context) => const Bookify()),
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
                  MaterialPageRoute(
                      builder: (context) => const CliStudyTimer()),
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
                  MaterialPageRoute(
                      builder: (context) => const PredictTheNumber()),
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
                  MaterialPageRoute(
                      builder: (context) => const SpaceInvaders()),
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
