import 'dart:async';

import 'package:file_picker/file_picker.dart';
import 'package:http/http.dart';
import 'package:tikitaka/channels/app_web_channel.dart';
import 'package:tikitaka/models/app_user.dart';

import '../models/app_cache.dart';

extension ProfileTransfer on AppWebChannel {

  Future<void> updateProfile({PlatformFile? selectedFile, required AppUser user, required void Function() onSuccess, void Function(int?)? onFailed})  async {
    try {
      final request = MultipartRequest('POST', Uri.parse("$backendURL/api/user/update/info?name=${user.name}"));
      request.headers.addAll({"Authorization": "Bearer ${appCacheData.token}"});

      if(selectedFile != null) {

        final totalLength = selectedFile.size;

        final stream = selectedFile.xFile.openRead();
        int bytesSent = 0;
        final byteStream = stream.transform<List<int>>(
          StreamTransformer.fromHandlers(
            handleData: (data, sink) {
              bytesSent += data.length;
              sink.add(data);
              // if (onProgress != null) {
              //   onProgress(bytesSent, totalLength);
              // }
            },
          ),
        );

        print(selectedFile.name);
        final multipartFile = MultipartFile(
          // pFile.name,
          "file",
          byteStream,
          totalLength,
          filename: selectedFile.name,
        );

        request.files.add(multipartFile);
      }

        // request.fields.addAll({"name": user.name});

      final response = await request.send();

      if (response.statusCode == 200) {
        onSuccess?.call();
      } else {
        onFailed?.call(response.statusCode);
      }
    } catch (e) {
      print(e);
      onFailed?.call(null);
    }
  }
}