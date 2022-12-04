import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class ExperienceScreenLargeSizeBodyCodeYourFutureDescription
    extends StatelessWidget {
  const ExperienceScreenLargeSizeBodyCodeYourFutureDescription({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(left: 30, right: 30, top: 40, bottom: 80),
      child: Card(
        color: Colors.grey[900],
        child: SizedBox(
          height: 300,
          child: Padding(
            padding: const EdgeInsets.only(left: 20),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                const Text(
                  "At CodeYourFuture, I am working both as a technical assistant and technical lead and taught "
                  "full stack web development to trainees consisting programming languages and frameworks such as "
                  "HTML, CSS, JavaScript, React.js, Node and PostgreSQL.",
                  style: TextStyle(
                    fontSize: 20,
                    color: Colors.white,
                  ),
                ),
                const Text(
                  "In addition, I am mentoring 3 or 4 students in the class specifically in their tech journey.",
                  style: TextStyle(
                    fontSize: 20,
                    color: Colors.white,
                  ),
                ),
                InkWell(
                  onTap: () async {
                    const url = "https://codeyourfuture.io";
                    if (await canLaunchUrl(Uri.parse(url))) {
                      await launchUrl(Uri.parse(url));
                    } else {
                      throw "Could not launch $url";
                    }
                  },
                  child: const Text(
                    "To learn more about who CodeYourFuture is, and what they do, press into this text.",
                    style: TextStyle(
                      fontSize: 20,
                      color: Colors.white,
                    ),
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
