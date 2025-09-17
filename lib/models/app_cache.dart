import 'dart:convert';
import 'dart:io';

import 'package:amphi/models/app_cache_data_core.dart';
import 'package:amphi/utils/path_utils.dart';
import 'package:path_provider/path_provider.dart';

final appCacheData = AppCacheData.getInstance();

class AppCacheData extends AppCacheDataCore {
  static final AppCacheData _instance = AppCacheData();
  static AppCacheData getInstance() => _instance;

  String get token => data["token"] ?? "";
  set token(value) => data["token"] = value;
  bool initialized = false;

  @override
  Future<void> getData() async {
    var directory = await getApplicationSupportDirectory();
    var file = File(PathUtils.join(directory.path, "cache.json"));
    try {
      data = jsonDecode(await file.readAsString());
    }
    catch(e) {
      save();
    }

    initialized = true;
  }

}