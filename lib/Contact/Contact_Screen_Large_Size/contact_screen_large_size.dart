import 'package:flutter/material.dart';
import 'package:personal_website_new/Contact/Contact_Screen_Large_Size/Contact_Screen_Large_Size_Appbar/contact_screen_large_size_appbar.dart';
import 'package:personal_website_new/Contact/Contact_Screen_Large_Size/Contact_Screen_Large_Size_Body/contact_screen_large_size_body.dart';

class ContactScreenLargeSize extends StatelessWidget {
  const ContactScreenLargeSize({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      appBar: ContactScreenLargeSizeAppBar(),
      backgroundColor: Colors.black,
      body: ContactScreenLargeSizeBody(),
    );
  }
}
