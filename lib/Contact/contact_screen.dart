import 'package:flutter/material.dart';
import 'package:personal_website_new/Contact/contact_screen_large_size.dart';
import 'package:personal_website_new/Contact/contact_screen_small_size.dart';

class ContactScreen extends StatelessWidget {
  const ContactScreen({super.key});

  @override
  Widget build(BuildContext context) {
    if (MediaQuery.of(context).size.width >= 953) {
      return const ContactScreenLargeSize();
    } else {
      return const ContactScreenSmallSize();
    }
  }
}
