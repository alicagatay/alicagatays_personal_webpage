import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class WorkoutBot extends StatelessWidget {
  const WorkoutBot({Key? key}) : super(key: key);

  static _launchURL(url) async {
    if (await canLaunchUrl(Uri.parse(url))) {
      await launchUrl(Uri.parse(url));
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
              _launchURL('https://github.com/alicagatay/workout_bot');
            },
            child: const SizedBox(
              width: 800,
              child: Text(
                "WorkoutBot is a workout recommender chatbot software "
                "that uses machine learning to recommend workouts to its users, "
                "based on their request messages. "
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
