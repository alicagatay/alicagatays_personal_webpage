import 'package:flutter/material.dart';
import 'package:personal_website_new/Contact/contact_screen.dart';
import 'package:personal_website_new/Experience/experience_screen.dart';
import 'package:personal_website_new/Projects/projects_screen.dart';
import 'package:personal_website_new/Skills/skills_screen.dart';

class HomeScreenSmallSize extends StatelessWidget {
  const HomeScreenSmallSize({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: true,
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
        centerTitle: true,
      ),
      drawer: ListView(
        children: <Widget>[
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
              padding: const EdgeInsets.symmetric(vertical: 40),
              child: Text(
                "Skills",
                style: TextStyle(
                  color: Colors.grey[300],
                  fontSize: 30,
                ),
              ),
            ),
          ),
          InkWell(
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => const ProjectsScreen(),
                ),
              );
            },
            child: Container(
              alignment: Alignment.center,
              padding: const EdgeInsets.symmetric(vertical: 40),
              child: Text(
                "Projects",
                style: TextStyle(
                  color: Colors.grey[300],
                  fontSize: 30,
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
              padding: const EdgeInsets.symmetric(vertical: 40),
              child: Text(
                "Experience",
                style: TextStyle(
                  color: Colors.grey[300],
                  fontSize: 30,
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
              padding: const EdgeInsets.symmetric(vertical: 40),
              child: Text(
                "Contact",
                style: TextStyle(
                  color: Colors.grey[300],
                  fontSize: 30,
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
                child: Text(
                  "Hi there, my name is Ali. "
                  "I am a software developer based in Birmingham, UK. "
                  "I am mainly interested in full stack web development and mobile application development. "
                  "In my free times, I love working out, listening to music, "
                  "and program. My favorite programming language is JavaScript, and my favorite framework "
                  "is Flutter.",
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 30,
                  ),
                ),
              ),
            ),
          ),
          Center(
            child: Container(
              width: 350,
              height: 350,
              decoration: const BoxDecoration(
                shape: BoxShape.circle,
                image: DecorationImage(
                    image: NetworkImage(
                      'https://avatars.githubusercontent.com/u/29245767?v=4',
                    ),
                    fit: BoxFit.fill),
              ),
            ),
          )
        ],
      ),
    );
  }
}
