import 'package:flutter/material.dart';

final textTheme = TextTheme(
  headlineMedium: TextStyle(
    fontSize: 30
  )
);

final highlightColor = Color(0xff008cff);

final inputDecorationTheme = InputDecorationTheme(
  enabledBorder: InputBorder.none,
  disabledBorder: InputBorder.none,
  focusedBorder: InputBorder.none,
);

final lightThemeData = ThemeData(
  cardColor: Colors.white,
  scaffoldBackgroundColor: Color(0xFFF0F0F0),
  textTheme: textTheme,
  iconTheme: IconThemeData(
    color: highlightColor
  ),
  inputDecorationTheme: inputDecorationTheme,
  // colorScheme: ColorScheme(brightness: Brightness.light, primary: , onPrimary: onPrimary, secondary: secondary, onSecondary: onSecondary, error: error, onError: onError, surface: surface, onSurface: onSurface),
  highlightColor: highlightColor,
  filledButtonTheme: FilledButtonThemeData(
    style: FilledButton.styleFrom(
      padding: EdgeInsets.zero,
      backgroundColor: highlightColor,
      textStyle: TextStyle(
        fontSize: 25
      ),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(5)
      ),
      side: BorderSide(style: BorderStyle.none)
    )
  )
);
final darkThemeData = ThemeData(
    cardColor: Colors.white,
    scaffoldBackgroundColor: Color(0xFFF0F0F0),
  textTheme: textTheme,
    highlightColor: highlightColor,
    iconTheme: IconThemeData(
        color: highlightColor
    ),
    inputDecorationTheme: inputDecorationTheme,
    filledButtonTheme: FilledButtonThemeData(
        style: FilledButton.styleFrom(
            padding: EdgeInsets.zero,
            backgroundColor: highlightColor,
            textStyle: TextStyle(
                fontSize: 25
            ),
            shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(5)
            ),
            side: BorderSide(style: BorderStyle.none)
        )
    )
);