import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

void main() {
  runApp(
    const MyApp(),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  _launchCodeYourFutureWebsite() async {
    Uri url = Uri.parse('https://codeyourfuture.io/');
    await launchUrl(url);
  }

  _launchMediumAccountPage() async {
    Uri url = Uri.parse('https://medium.com/@aliccagatay');
    await launchUrl(url);
  }

  _launchGithubProfile() async {
    Uri url = Uri.parse('https://github.com/alicagatay');
    await launchUrl(url);
  }

  _launchEmailSender() async {
    Uri url = Uri.parse('mailto:aliccagatay@gmail.com');
    await launchUrl(url);
  }

  _launchLinkedInProfile() async {
    Uri url = Uri.parse('https://www.linkedin.com/in/alicagatay');
    await launchUrl(url);
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        backgroundColor: Colors.black,
        body: SingleChildScrollView(
          child: Container(
            width: double.infinity,
            height: 2600,
            color: const Color.fromARGB(255, 40, 44, 52),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Container(
                  margin: EdgeInsets.only(
                    top: MediaQuery.of(context).size.height / 2 - 300,
                    bottom: 30,
                  ),
                  child: Container(
                    margin: const EdgeInsets.symmetric(horizontal: 20),
                    child: const FittedBox(
                      fit: BoxFit.scaleDown,
                      child: Text(
                        'Hello, my name is Ali Cagatay',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 40,
                        ),
                      ),
                    ),
                  ),
                ),
                Container(
                  margin: const EdgeInsets.symmetric(horizontal: 20),
                  child: const Text(
                    'I am a full-stack developer, a writer and a full time learner.',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 20,
                    ),
                  ),
                ),
                Container(
                  margin: const EdgeInsets.only(
                    top: 80,
                    left: 20,
                    right: 20,
                  ),
                  child: CircleAvatar(
                    radius: MediaQuery.of(context).size.height / 4,
                    backgroundImage: const NetworkImage(
                      'https://avatars.githubusercontent.com/u/29245767?v=4',
                    ),
                  ),
                ),
                Container(
                  margin: const EdgeInsets.only(
                    top: 60,
                    bottom: 30,
                    left: 20,
                    right: 20,
                  ),
                  child: Container(
                    margin: const EdgeInsets.symmetric(horizontal: 20),
                    child: const Text(
                      "I work on developing full-stack web and mobile applications, APIs, "
                      "and databases using tools such as JavaScript, React.js, Node.js, Flutter and PostgreSQL.",
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 20,
                      ),
                    ),
                  ),
                ),
                Container(
                  margin: const EdgeInsets.only(
                    top: 60,
                    bottom: 40,
                    left: 20,
                    right: 20,
                  ),
                  child: Container(
                    margin: const EdgeInsets.symmetric(horizontal: 20),
                    child: const Text(
                      "Aside from that, I also work on a coding bootcamp called CodeYourFuture, "
                      "where I, with the help of other instructors, teach full stack web development "
                      "to it's trainees of the bootcamp and mentor them in their journey of tech.",
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 20,
                      ),
                    ),
                  ),
                ),
                Center(
                  child: InkWell(
                    onTap: _launchCodeYourFutureWebsite,
                    child: Container(
                      margin: const EdgeInsets.only(
                        left: 20,
                        right: 20,
                      ),
                      decoration: const BoxDecoration(
                        shape: BoxShape.rectangle,
                        color: Color.fromARGB(255, 87, 87, 87),
                        borderRadius: BorderRadius.all(
                          Radius.circular(20),
                        ),
                      ),
                      width: 450,
                      height: 100,
                      child: Center(
                        child: Container(
                          margin: const EdgeInsets.all(20),
                          child: const Text(
                            "Press to learn more about CodeYourFuture.",
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 20,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
                Container(
                  margin: const EdgeInsets.only(
                    top: 60,
                    bottom: 40,
                    left: 20,
                    right: 20,
                  ),
                  child: Container(
                    margin: const EdgeInsets.symmetric(horizontal: 20),
                    child: const Text(
                      "In addition, I create educational content for developers, teaching them about "
                      "full-stack web and mobile development using technologies such as HTML, CSS, JavaScript, React, Dart etc.  "
                      "in the forms of blog posts inside my Medium blog.",
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 20,
                      ),
                    ),
                  ),
                ),
                Center(
                  child: InkWell(
                    onTap: _launchMediumAccountPage,
                    child: Container(
                      margin: const EdgeInsets.only(
                        left: 20,
                        right: 20,
                      ),
                      decoration: const BoxDecoration(
                        shape: BoxShape.rectangle,
                        color: Color.fromARGB(255, 87, 87, 87),
                        borderRadius: BorderRadius.all(
                          Radius.circular(20),
                        ),
                      ),
                      width: 400,
                      height: 100,
                      child: Center(
                        child: Container(
                          margin: const EdgeInsets.all(20),
                          child: const Text(
                            "Press to launch my blog on Medium.",
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 20,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
                Container(
                  margin: const EdgeInsets.only(
                    top: 60,
                    bottom: 40,
                    left: 20,
                    right: 20,
                  ),
                  child: Container(
                    margin: const EdgeInsets.symmetric(horizontal: 20),
                    child: const Text(
                      "I also have a GitHub profile where I store all of my projects with their source codes "
                      "I have built before or in the process of building, just like this website.",
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 20,
                      ),
                    ),
                  ),
                ),
                Center(
                  child: InkWell(
                    onTap: _launchGithubProfile,
                    child: Container(
                      margin: const EdgeInsets.only(
                        left: 20,
                        right: 20,
                      ),
                      decoration: const BoxDecoration(
                        shape: BoxShape.rectangle,
                        color: Color.fromARGB(255, 87, 87, 87),
                        borderRadius: BorderRadius.all(
                          Radius.circular(20),
                        ),
                      ),
                      width: 400,
                      height: 100,
                      child: Center(
                        child: Container(
                          margin: const EdgeInsets.all(20),
                          child: const Text(
                            "Press to launch my GitHub profile.",
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 20,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
                Container(
                  margin: const EdgeInsets.only(
                    top: 60,
                    bottom: 40,
                    left: 20,
                    right: 20,
                  ),
                  child: Container(
                    margin: const EdgeInsets.symmetric(horizontal: 20),
                    child: const Text(
                      "If you ever want to contact me, you can do it either from my email address, "
                      "or from my LinkedIn, which I will be leaving links to them below.",
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 20,
                      ),
                    ),
                  ),
                ),
                Center(
                  child: InkWell(
                    onTap: _launchEmailSender,
                    child: Container(
                      margin: const EdgeInsets.only(
                        top: 20,
                        left: 20,
                        right: 20,
                        bottom: 60,
                      ),
                      decoration: const BoxDecoration(
                        shape: BoxShape.rectangle,
                        color: Color.fromARGB(255, 87, 87, 87),
                        borderRadius: BorderRadius.all(
                          Radius.circular(20),
                        ),
                      ),
                      width: 400,
                      height: 100,
                      child: Center(
                        child: Container(
                          margin: const EdgeInsets.all(20),
                          child: const Text(
                            "Press to email me.",
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 20,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
                Center(
                  child: InkWell(
                    onTap: _launchLinkedInProfile,
                    child: Container(
                      margin: const EdgeInsets.only(
                        left: 20,
                        right: 20,
                      ),
                      decoration: const BoxDecoration(
                        shape: BoxShape.rectangle,
                        color: Color.fromARGB(255, 87, 87, 87),
                        borderRadius: BorderRadius.all(
                          Radius.circular(20),
                        ),
                      ),
                      width: 400,
                      height: 100,
                      child: Center(
                        child: Container(
                          margin: const EdgeInsets.all(20),
                          child: const Text(
                            "Press to launch my LinkedIn profile.",
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 20,
                            ),
                          ),
                        ),
                      ),
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
