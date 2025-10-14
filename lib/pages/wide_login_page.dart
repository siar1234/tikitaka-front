import 'dart:io';

import 'package:amphi/models/app.dart';
import 'package:bitsdojo_window/bitsdojo_window.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tikitaka/channels/app_web_channel.dart';
import 'package:tikitaka/components/card_button.dart';
import 'package:tikitaka/models/app_cache.dart';
import 'package:tikitaka/models/app_localizations.dart';
import 'package:tikitaka/models/app_state.dart';
import 'package:tikitaka/models/fragment_index.dart';
import 'package:tikitaka/providers/chats_provider.dart';

import '../components/custom_window_button.dart';
import '../providers/providers.dart';
import '../utils/toast.dart';

class WideLoginPage extends ConsumerStatefulWidget {
  final WidgetRef ref;
  const WideLoginPage({super.key, required this.ref});

  @override
  WideLoginPageState createState() => WideLoginPageState();
}

class WideLoginPageState extends ConsumerState<WideLoginPage> {

  final idController = TextEditingController();
  final passwordController = TextEditingController();

  @override
  void dispose() {
    idController.dispose();
    passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final colors = CustomWindowButtonColors(
        iconMouseOver: Theme.of(context).textTheme.bodyMedium?.color,
        mouseOver: const Color.fromRGBO(125, 125, 125, 0.1),
        iconNormal: Theme.of(context).textTheme.bodyMedium?.color,
        mouseDown: const Color.fromRGBO(125, 125, 125, 0.1),
        iconMouseDown: Theme.of(context).textTheme.bodyMedium?.color,
        normal: Theme.of(context).scaffoldBackgroundColor
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
                            appWindow.restore();
                          },
                        )
                            : MaximizeCustomWindowButton(
                          colors: colors,
                          onPressed: () {
                            appWindow.maximize();
                          },
                        ),
                        CloseCustomWindowButton(
                            colors: CustomWindowButtonColors(
                                mouseOver: const Color(0xFFD32F2F),
                                mouseDown: const Color(0xFFB71C1C),
                                iconNormal: const Color(0xFF805306),
                                iconMouseOver: const Color(0xFFFFFFFF),
                                normal: Theme.of(context).scaffoldBackgroundColor))
                      ]
                    ],
                  )
              ),

            )
          ],
          Center(
            child: Container(
              width: 550,
              height: 350,
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
                    child: Text("로그인", style: TextStyle(
                        fontSize: Theme
                            .of(context)
                            .textTheme
                            .headlineMedium
                            ?.fontSize,
                        fontWeight: FontWeight.bold
                    )),
                  ),
                  CustomInput(controller: idController, icon: Icons.account_circle, hint: "아이디"),
                  CustomInput(controller: passwordController, icon: Icons.lock, hint: "비밀번호", obscureText: true),
                  LoginButton(onPressed: () async {
                    await appWebChannel.login(id: idController.text, password: passwordController.text, onSuccess: (token) {
                      appState.onLoggedIn(() {
                        appCacheData.token = token;
                        appWebChannel.getUserInfo(onSuccess: (user) {
                          ref.read(profileProvider.notifier).state = user;
                        });
                        appCacheData.save();
                      });
                      appWebChannel.listenAlarm(widget.ref, () {
                        widget.ref.read(chatsProvider.notifier).init(widget.ref);
                        widget.ref.read(fragmentIndexProvider.notifier).state = FragmentIndex.home;
                      });
                    }, onFailed: (code) {
                      if(code == HttpStatus.unauthorized) {
                        showToast(context, "야 이새끼야");
                      }
                      else {
                        showToast(context, "하 참 억울하거든요?");
                      }
                    });
                  }, title: "로그인"),
                  LoginButton(onPressed: () {
                    ref.read(registerProvider.notifier).state = true;
                  }, title: "회원가입")
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class LoginButton extends StatelessWidget {

  final void Function() onPressed;
  final String title;
  const LoginButton({required this.onPressed, required this.title});

  @override
  Widget build(BuildContext context) {
    return CardButton(width: 250, height: 50, onPressed: onPressed, title: title);
  }
}


class CustomInput extends StatelessWidget {

  final TextEditingController controller;
  final IconData icon;
  final String hint;
  final bool obscureText;
  final void Function(String)? onChanged;
  const CustomInput({required this.controller, required this.icon, required this.hint, this.obscureText = false, this.onChanged});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: SizedBox(
        width: 300,
        height: 50,
        child: TextField(
          obscureText: obscureText,
          controller: controller,
          onChanged: onChanged,
          decoration: InputDecoration(
            fillColor: Theme.of(context).highlightColor,
              hintText: hint,
              focusedBorder: OutlineInputBorder(
                  borderSide: BorderSide(
                      color: Theme.of(context).highlightColor,
                      style: BorderStyle.solid,
                      width: 2),
                  borderRadius: BorderRadius.circular(10)
              ),
              border: OutlineInputBorder(
                  borderSide: BorderSide(
                      color: Theme.of(context).disabledColor,
                      style: BorderStyle.solid,
                  width: 1),
                  borderRadius: BorderRadius.circular(10)
              ),
              enabledBorder: OutlineInputBorder(
                  borderSide: BorderSide(
                      color: Theme.of(context).disabledColor,
                      style: BorderStyle.solid,
                      width: 1),
                  borderRadius: BorderRadius.circular(10)
              ),
              disabledBorder: OutlineInputBorder(
                  borderSide: BorderSide(
                      color: Theme.of(context).disabledColor,
                      style: BorderStyle.solid,
                  width: 1),
                  borderRadius: BorderRadius.circular(10)
              ),
              prefixIcon: Icon(
                icon
              )
          ),
        ),
      ),
    );
  }
}
