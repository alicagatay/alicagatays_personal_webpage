import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class ContactScreenLargeSizeBody extends StatelessWidget {
  const ContactScreenLargeSizeBody({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: <Widget>[
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 80, horizontal: 30),
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
                          fontSize: 60,
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
                          fontSize: 25,
                        ),
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(bottom: 50),
                    child: Center(
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          const Padding(
                            padding: EdgeInsets.only(right: 5),
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
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          const Padding(
                            padding: EdgeInsets.only(right: 5),
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
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          const Padding(
                            padding: EdgeInsets.only(right: 5),
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
                  const Padding(
                    padding: EdgeInsets.only(bottom: 50),
                    child: Center(
                      child: Text(
                        "You can also book a 1-2-1 meeting with me to talk "
                        "about your ideas live instead of mailing/messaging "
                        "from the link below:",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 25,
                        ),
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(bottom: 50),
                    child: Center(
                      child: InkWell(
                        onTap: () {
                          _launchUrl(
                              'https://calendar.app.google/CiCYCC5teYXoBqDi7');
                        },
                        child: const Text(
                          "Google Calendar Booking Page",
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 25,
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
    );
  }

  Future<void> _launchUrl(url) async {
    if (!await launchUrl(Uri.parse(url))) {
      throw 'Could not launch $url';
    }
  }
}
