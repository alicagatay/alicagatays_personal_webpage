import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class ContactScreenSmallSizeBody extends StatelessWidget {
  const ContactScreenSmallSizeBody({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: <Widget>[
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 80, horizontal: 20),
          child: Card(
            color: Colors.grey[900],
            child: Padding(
              padding: const EdgeInsets.all(80),
              child: Column(
                children: <Widget>[
                  const Padding(
                    padding: EdgeInsets.only(bottom: 50),
                    child: Center(
                      child: Text(
                        "Get In Touch:",
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 35,
                        ),
                      ),
                    ),
                  ),
                  const Padding(
                    padding: EdgeInsets.only(bottom: 50),
                    child: Center(
                      child: Text(
                        "I am always open to new remote work and/or collaboration opportunities. "
                        "You can reach me out from:",
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 20,
                        ),
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(bottom: 50),
                    child: Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          const Padding(
                            padding: EdgeInsets.only(bottom: 10),
                            child: Text(
                              "Email: ",
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 25,
                              ),
                            ),
                          ),
                          InkWell(
                            onTap: () {
                              _launchUrl('mailto:aliccagatay@gmail.com');
                            },
                            child: const Text(
                              "aliccagatay@gmail.com",
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 20,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(bottom: 50),
                    child: Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          const Padding(
                            padding: EdgeInsets.only(bottom: 10),
                            child: Text(
                              "LinkedIn: ",
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 25,
                              ),
                            ),
                          ),
                          InkWell(
                            onTap: () {
                              _launchUrl(
                                  'https://www.linkedin.com/in/alicagatay');
                            },
                            child: const Text(
                              "Ali Cagatay ",
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 25,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(bottom: 50),
                    child: Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          const Padding(
                            padding: EdgeInsets.only(bottom: 10),
                            child: Text(
                              "Discord: ",
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 25,
                              ),
                            ),
                          ),
                          InkWell(
                            onTap: () {
                              _launchUrl(
                                  'http://discordapp.com/users/alicagatay#8472');
                            },
                            child: const Text(
                              "alicagatay#8472 ",
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 25,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }

  Future<void> _launchUrl(url) async {
    if (!await launchUrl(Uri.parse(url))) {
      throw 'Could not launch $url';
    }
  }
}