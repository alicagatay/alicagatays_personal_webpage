import 'package:alicagatays_personal_webpage/Projects/predict_the_number.dart';
import 'package:alicagatays_personal_webpage/Projects/space_invaders.dart';
import 'package:alicagatays_personal_webpage/Projects/workout_bot.dart';
import 'package:alicagatays_personal_webpage/Projects/nvim.dart';
import 'package:flutter/material.dart';
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
        body: LayoutBuilder(
          builder: (context, constraints) {
            return GridView.count(
              crossAxisCount: constraints.maxWidth > 700 ? 2 : 1,
              padding: const EdgeInsets.all(60),
              crossAxisSpacing: 50,
              mainAxisSpacing: 50,
              children: <Widget>[
                InkWell(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const Nvim()),
                    );
                  },
                  child: Card(
                    color: Colors.grey[900],
                    child: Center(
                      child: Text(
                        "Nvim",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: Colors.grey[400],
                          fontSize: 30,
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
                          builder: (context) => const WorkoutBot()),
                    );
                  },
                  child: Card(
                    color: Colors.grey[900],
                    child: Center(
                      child: Text(
                        "WorkoutBot",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: Colors.grey[400],
                          fontSize: 30,
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
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: Colors.grey[400],
                          fontSize: 30,
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
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: Colors.grey[400],
                          fontSize: 30,
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
                          builder: (context) => const WorkoutBot()),
                    );
                  },
                  child: Card(
                    color: Colors.grey[900],
                    child: Center(
                      child: Text(
                        "Nameless Secret Project",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: Colors.grey[400],
                          fontSize: 30,
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
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: Colors.grey[400],
                          fontSize: 30,
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            );
          },
        ),
      ),
    );
  }
}
