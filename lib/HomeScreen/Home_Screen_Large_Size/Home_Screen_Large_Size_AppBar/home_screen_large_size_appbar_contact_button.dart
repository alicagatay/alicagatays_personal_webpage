import 'package:flutter/material.dart';
import 'package:personal_website_new/Contact/contact_screen.dart';

class HomeScreenLargeSizeAppBarContactButton extends StatelessWidget {
  const HomeScreenLargeSizeAppBarContactButton({super.key});

  @override
  Widget build(BuildContext context) {
    return InkWell(
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
    );
  }
}
