import 'package:flutter/material.dart';

class ContactScreenLargeSizeAppBarTitle extends StatelessWidget {
  const ContactScreenLargeSizeAppBarTitle({super.key});

  @override
  Widget build(BuildContext context) {
    return Text(
      "Ali Cagatay",
      style: TextStyle(
        fontSize: 35,
        fontWeight: FontWeight.w400,
        color: Colors.grey[300],
      ),
    );
  }
}
