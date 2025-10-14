import 'dart:io';

import 'package:amphi/models/app.dart';
import 'package:bitsdojo_window/bitsdojo_window.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tikitaka/channels/app_web_channel.dart';
import 'package:tikitaka/pages/wide_login_page.dart';
import 'package:tikitaka/providers/providers.dart';
import 'package:tikitaka/utils/toast.dart';

import '../components/custom_window_button.dart';
import '../models/app_localizations.dart';

class WideRegisterPage extends ConsumerStatefulWidget {
  const WideRegisterPage({super.key});

  @override
  ConsumerState<WideRegisterPage> createState() => _WideRegisterPageState();
}

class _WideRegisterPageState extends ConsumerState<WideRegisterPage> {

  final nameController = TextEditingController();
  final idController = TextEditingController();
  final passwordController = TextEditingController();
  final passwordConfirmController = TextEditingController();

  @override
  void dispose() {
    idController.dispose();
    passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final colors = CustomWindowButtonColors(
        iconMouseOver: Theme
            .of(context)
            .textTheme
            .bodyMedium
            ?.color,
        mouseOver: const Color.fromRGBO(125, 125, 125, 0.1),
        iconNormal: Theme
            .of(context)
            .textTheme
            .bodyMedium
            ?.color,
        mouseDown: const Color.fromRGBO(125, 125, 125, 0.1),
        iconMouseDown: Theme
            .of(context)
            .textTheme
            .bodyMedium
            ?.color,
        normal: Theme
            .of(context)
            .scaffoldBackgroundColor
    );

    return Scaffold(
      body: Stack(
        children: [
          if(App.isDesktop()) ...[
            Positioned(
              left: 0,
              right: 0,
              top: 0,
              child: SizedBox(
                  height: 50,
                  child: Row(
                    children: [
                      Expanded(child: MoveWindow()),
                      if(Platform.isWindows) ...[
                        Visibility(
                          visible: App.isDesktop(),
                          child: MinimizeCustomWindowButton(colors: colors),
                        ),
                        appWindow.isMaximized
                            ? RestoreCustomWindowButton(
                          colors: colors,
                          onPressed: () {
                            setState(() {
                              appWindow.restore();
                            });
                          },
                        )
                            : MaximizeCustomWindowButton(
                          colors: colors,
                          onPressed: () {
                            setState(() {
                              appWindow.maximize();
                            });
                          },
                        ),
                        CloseCustomWindowButton(
                            colors: CustomWindowButtonColors(
                                mouseOver: const Color(0xFFD32F2F),
                                mouseDown: const Color(0xFFB71C1C),
                                iconNormal: const Color(0xFF805306),
                                iconMouseOver: const Color(0xFFFFFFFF),
                                normal: Theme
                                    .of(context)
                                    .scaffoldBackgroundColor))
                      ]
                    ],
                  )
              ),

            )
          ],
          Center(
            child: Container(
              width: 550,
              height: 475,
              decoration: BoxDecoration(
                  color: Theme
                      .of(context)
                      .cardColor,
                  borderRadius: BorderRadius.circular(15)
              ),
              child: Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Text("회원가입", style: TextStyle(
                        fontSize: Theme
                            .of(context)
                            .textTheme
                            .headlineMedium
                            ?.fontSize,
                        fontWeight: FontWeight.bold
                    )),
                  ),
                  CustomInput(controller: nameController, icon: Icons.account_circle, hint: "이름"),
                  CustomInput(controller: idController, icon: Icons.account_circle, hint: "아이디"),
                  CustomInput(controller: passwordController, icon: Icons.lock, hint: "비밀번호", obscureText: true),
                  CustomInput(controller: passwordConfirmController, icon: Icons.lock, hint: "비밀번호 확인", obscureText: true, onChanged: (text) {
                    setState(() {

                    });
                  }),
                  Visibility(
                    visible: passwordController.text != passwordConfirmController.text,
                    child: Text(
                      "비밀번호가 다릅니다",
                      style: TextStyle(
                        color: Colors.red
                      ),
                    ),
                  ),
                  LoginButton(onPressed: () async {
                    appWebChannel.register(
                      username: nameController.text,
                      id: idController.text,
                      password: passwordController.text,
                      onSuccess: () {
                        ref.read(registerProvider.notifier).state = false;
                      },
                      onFailed: (d) {
                        showToast(context, "회원가입에 실패했습니다: $d");
                      }
                    );
                  }, title: "회원가입"),
                  LoginButton(onPressed: () async {
                    ref.read(registerProvider.notifier).state = false;
                  }, title: "취소"),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
