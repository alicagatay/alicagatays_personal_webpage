import 'package:flutter/material.dart';
import 'package:personal_website_new/HomeScreen/home_screen.dart';

void main() {
  runApp(
    const MainScreen(),
  );
}

class MainScreen extends StatelessWidget {
  const MainScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: HomeScreen(),
    );
  }
}
