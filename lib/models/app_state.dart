import 'package:amphi/models/app.dart';

final appState = AppState.getInstance();

class AppState {
  static final _instance = AppState();
  static AppState getInstance() => _instance;

  late void Function(void Function()) onLoggedIn;


}