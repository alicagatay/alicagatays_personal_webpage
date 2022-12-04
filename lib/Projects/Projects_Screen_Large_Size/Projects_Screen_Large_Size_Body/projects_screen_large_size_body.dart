import 'package:flutter/material.dart';

class ProjectsScreenLargeSizeBody extends StatelessWidget {
  const ProjectsScreenLargeSizeBody({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: <Widget>[
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 80, horizontal: 30),
          child: Card(
            color: Colors.grey[900],
            child: const Padding(
              padding: EdgeInsets.all(80),
              child: Center(
                child: Text(
                  "Coming soon. ",
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 30,
                  ),
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
