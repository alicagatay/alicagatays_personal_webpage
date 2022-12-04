import 'package:flutter/material.dart';
import 'package:personal_website_new/Contact/Contact_Screen_Small_Size/Contact_Screen_Small_Size_Body/contact_screen_small_size_body.dart';
import 'package:personal_website_new/Contact/Contact_Screen_Small_Size/Contact_Screen_Small_Size_Drawer/contact_screen_small_size_drawer.dart';
import 'package:personal_website_new/Contact/Contact_Screen_Small_Size/contact_screen_small_size_appbar.dart';

class ContactScreenSmallSize extends StatelessWidget {
  const ContactScreenSmallSize({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      appBar: ContactScreenSmallSizeAppBar(),
      drawer: ContactScreenSmallSizeDrawer(),
      backgroundColor: Colors.black,
      body: ContactScreenSmallSizeBody(),
    );
  }
}
