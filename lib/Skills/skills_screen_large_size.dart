import 'package:flutter/material.dart';
import 'package:personal_website_new/Contact/contact_screen.dart';
import 'package:personal_website_new/Experience/experience_screen.dart';
import 'package:personal_website_new/HomeScreen/home_screen.dart';
import 'package:personal_website_new/Projects/projects_screen.dart';

class SkillsScreenLargeSize extends StatelessWidget {
  const SkillsScreenLargeSize({super.key});

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
                  builder: (context) => const ProjectsScreen(),
                ),
              );
            },
            child: Container(
              alignment: Alignment.center,
              padding: const EdgeInsets.symmetric(horizontal: 40),
              child: Text(
                "Projects",
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
          const Padding(
            padding: EdgeInsets.only(top: 60, left: 30, right: 30),
            child: Text(
              "Tech Stack",
              style: TextStyle(
                fontSize: 50,
                color: Colors.white,
              ),
            ),
          ),
          Padding(
            padding:
                const EdgeInsets.only(left: 30, right: 30, top: 40, bottom: 80),
            child: Card(
              color: Colors.grey[900],
              child: SizedBox(
                width: MediaQuery.of(context).size.width,
                height: 400,
                child: ListView(
                  scrollDirection: Axis.horizontal,
                  children: <Widget>[
                    Padding(
                      padding: const EdgeInsets.all(60),
                      child: SizedBox(
                        width: 250,
                        child: Card(
                          color: Colors.grey[800],
                          child: const Center(
                            child: Text(
                              'JavaScript',
                              style: TextStyle(
                                fontSize: 40,
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(60),
                      child: SizedBox(
                        width: 250,
                        child: Card(
                          color: Colors.grey[800],
                          child: const Center(
                            child: Text(
                              'Python',
                              style: TextStyle(
                                fontSize: 40,
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(60),
                      child: SizedBox(
                        width: 250,
                        child: Card(
                          color: Colors.grey[800],
                          child: const Center(
                            child: Text(
                              'Dart',
                              style: TextStyle(
                                fontSize: 40,
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(60),
                      child: SizedBox(
                        width: 250,
                        child: Card(
                          color: Colors.grey[800],
                          child: const Center(
                            child: Text(
                              'Java',
                              style: TextStyle(
                                fontSize: 40,
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(60),
                      child: SizedBox(
                        width: 250,
                        child: Card(
                          color: Colors.grey[800],
                          child: const Center(
                            child: Text(
                              'HTML',
                              style: TextStyle(
                                fontSize: 40,
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(60),
                      child: SizedBox(
                        width: 250,
                        child: Card(
                          color: Colors.grey[800],
                          child: const Center(
                            child: Text(
                              'CSS',
                              style: TextStyle(
                                fontSize: 40,
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(60),
                      child: SizedBox(
                        width: 250,
                        child: Card(
                          color: Colors.grey[800],
                          child: const Center(
                            child: Text(
                              'PostgreSQL',
                              style: TextStyle(
                                fontSize: 40,
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(60),
                      child: SizedBox(
                        width: 250,
                        child: Card(
                          color: Colors.grey[800],
                          child: const Center(
                            child: Text(
                              'Matlab',
                              style: TextStyle(
                                fontSize: 40,
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
          const Padding(
            padding: EdgeInsets.only(top: 60, left: 30, right: 30),
            child: Text(
              "Framework & Library Stack",
              style: TextStyle(
                fontSize: 50,
                color: Colors.white,
              ),
            ),
          ),
          Padding(
            padding:
                const EdgeInsets.only(left: 30, right: 30, top: 40, bottom: 80),
            child: Card(
              color: Colors.grey[900],
              child: SizedBox(
                width: MediaQuery.of(context).size.width,
                height: 400,
                child: ListView(
                  scrollDirection: Axis.horizontal,
                  children: <Widget>[
                    Padding(
                      padding: const EdgeInsets.all(60),
                      child: SizedBox(
                        width: 250,
                        child: Card(
                          color: Colors.grey[800],
                          child: const Center(
                            child: Text(
                              'Flutter',
                              style: TextStyle(
                                fontSize: 40,
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(60),
                      child: SizedBox(
                        width: 250,
                        child: Card(
                          color: Colors.grey[800],
                          child: const Center(
                            child: Text(
                              'Django',
                              style: TextStyle(
                                fontSize: 40,
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(60),
                      child: SizedBox(
                        width: 250,
                        child: Card(
                          color: Colors.grey[800],
                          child: const Center(
                            child: Text(
                              'React.js',
                              style: TextStyle(
                                fontSize: 40,
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(60),
                      child: SizedBox(
                        width: 250,
                        child: Card(
                          color: Colors.grey[800],
                          child: const Center(
                            child: Text(
                              'Tensorflow',
                              style: TextStyle(
                                fontSize: 40,
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(60),
                      child: SizedBox(
                        width: 250,
                        child: Card(
                          color: Colors.grey[800],
                          child: const Center(
                            child: Text(
                              'PyTorch',
                              style: TextStyle(
                                fontSize: 40,
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(60),
                      child: SizedBox(
                        width: 250,
                        child: Card(
                          color: Colors.grey[800],
                          child: const Center(
                            child: Text(
                              'NLTK',
                              style: TextStyle(
                                fontSize: 40,
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
          const Padding(
            padding: EdgeInsets.only(top: 60, left: 30, right: 30),
            child: Text(
              "Tool Stack",
              style: TextStyle(
                fontSize: 50,
                color: Colors.white,
              ),
            ),
          ),
          Padding(
            padding:
                const EdgeInsets.only(left: 30, right: 30, top: 40, bottom: 80),
            child: Card(
              color: Colors.grey[900],
              child: SizedBox(
                width: MediaQuery.of(context).size.width,
                height: 400,
                child: ListView(
                  scrollDirection: Axis.horizontal,
                  children: <Widget>[
                    Padding(
                      padding: const EdgeInsets.all(60),
                      child: SizedBox(
                        width: 250,
                        child: Card(
                          color: Colors.grey[800],
                          child: const Center(
                            child: Text(
                              'Git',
                              style: TextStyle(
                                fontSize: 40,
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(60),
                      child: SizedBox(
                        width: 250,
                        child: Card(
                          color: Colors.grey[800],
                          child: const Center(
                            child: Text(
                              'Docker',
                              style: TextStyle(
                                fontSize: 40,
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(60),
                      child: SizedBox(
                        width: 250,
                        child: Card(
                          color: Colors.grey[800],
                          child: const Center(
                            child: Text(
                              "JetBrains IDE's",
                              style: TextStyle(
                                fontSize: 30,
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(60),
                      child: SizedBox(
                        width: 250,
                        child: Card(
                          color: Colors.grey[800],
                          child: const Center(
                            child: Text(
                              'VS Code',
                              style: TextStyle(
                                fontSize: 40,
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(60),
                      child: SizedBox(
                        width: 250,
                        child: Card(
                          color: Colors.grey[800],
                          child: const Center(
                            child: Text(
                              'Postman',
                              style: TextStyle(
                                fontSize: 40,
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
          const Padding(
            padding: EdgeInsets.only(top: 60, left: 30, right: 30),
            child: Text(
              "Design Stack",
              style: TextStyle(
                fontSize: 50,
                color: Colors.white,
              ),
            ),
          ),
          Padding(
            padding:
                const EdgeInsets.only(left: 30, right: 30, top: 40, bottom: 80),
            child: Card(
              color: Colors.grey[900],
              child: SizedBox(
                width: MediaQuery.of(context).size.width,
                height: 400,
                child: ListView(
                  scrollDirection: Axis.horizontal,
                  children: <Widget>[
                    Padding(
                      padding: const EdgeInsets.all(60),
                      child: SizedBox(
                        width: 250,
                        child: Card(
                          color: Colors.grey[800],
                          child: const Center(
                            child: Text(
                              'Affinity Designer',
                              style: TextStyle(
                                fontSize: 30,
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(60),
                      child: SizedBox(
                        width: 250,
                        child: Card(
                          color: Colors.grey[800],
                          child: const Center(
                            child: Text(
                              'Keynote',
                              style: TextStyle(
                                fontSize: 40,
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
