import 'package:flutter/material.dart';
import 'package:personal_website_new/Contact/contact_screen.dart';
import 'package:personal_website_new/Experience/experience_screen.dart';
import 'package:personal_website_new/HomeScreen/home_screen.dart';
import 'package:personal_website_new/Skills/skills_screen.dart';

class ProjectsScreenLargeSize extends StatelessWidget {
  const ProjectsScreenLargeSize({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        toolbarHeight: 80,
        backgroundColor: Colors.grey[900],
        title: Text(
          "Ali Cagatay",
          style: TextStyle(
            fontSize: 35,
            fontWeight: FontWeight.w400,
            color: Colors.grey[300],
          ),
        ),
        actions: <Widget>[
          InkWell(
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => const HomeScreen(),
                ),
              );
            },
            child: Container(
              alignment: Alignment.center,
              padding: const EdgeInsets.symmetric(horizontal: 40),
              child: Text(
                "Home",
                style: TextStyle(
                  color: Colors.grey[300],
                  fontSize: 20,
                ),
              ),
            ),
          ),
          InkWell(
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => const SkillsScreen(),
                ),
              );
            },
            child: Container(
              alignment: Alignment.center,
              padding: const EdgeInsets.symmetric(horizontal: 40),
              child: Text(
                "Skills",
                style: TextStyle(
                  color: Colors.grey[300],
                  fontSize: 20,
                ),
              ),
            ),
          ),
          InkWell(
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => const ExperienceScreen(),
                ),
              );
            },
            child: Container(
              alignment: Alignment.center,
              padding: const EdgeInsets.symmetric(horizontal: 40),
              child: Text(
                "Experience",
                style: TextStyle(
                  color: Colors.grey[300],
                  fontSize: 20,
                ),
              ),
            ),
          ),
          InkWell(
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => const ContactScreen(),
                ),
              );
            },
            child: Container(
              alignment: Alignment.center,
              padding: const EdgeInsets.symmetric(horizontal: 40),
              child: Text(
                "Contact",
                style: TextStyle(
                  color: Colors.grey[300],
                  fontSize: 20,
                ),
              ),
            ),
          )
        ],
      ),
      backgroundColor: Colors.black,
      body: ListView(
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
      ),
    );
  }
}
