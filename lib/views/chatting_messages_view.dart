import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tikitaka/channels/app_web_channel.dart';
import 'package:tikitaka/models/chat_room.dart';
import 'package:tikitaka/providers/chats_provider.dart';

import 'chatting_message_list_item.dart';

class ChattingMessagesView extends ConsumerStatefulWidget {
  final int chatRoomId;

  const ChattingMessagesView({super.key, required this.chatRoomId});

  @override
  ConsumerState<ChattingMessagesView> createState() => _ChattingMessagesViewState();
}

class _ChattingMessagesViewState extends ConsumerState<ChattingMessagesView> {
  final ScrollController _scrollController = ScrollController();

  @override
  void initState() {
    _scrollController.addListener(() {
      // Check if the user scrolled to the top
      if (_scrollController.position.pixels <= _scrollController.position.minScrollExtent) {

        appWebChannel.getChatHistory(
          chatRoomId: widget.chatRoomId,
          messageId: ref.watch(chatsProvider).chats.get(widget.chatRoomId).messages.first.id,
          onSuccess: (messages) {
            print(messages.length);
            ref.read(chatsProvider.notifier).insertMessages(widget.chatRoomId, messages);
          },
        );
      }
    });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final chatRoom = ref.watch(chatsProvider).chats.get(widget.chatRoomId);

    if (chatRoom.messages.isEmpty) {
      return Center(child: Text(""));
    }

    return ListView.builder(
      controller: _scrollController,
      itemCount: chatRoom.messages.length,
      itemBuilder: (context, index) {
        return ChattingMessageListItem(message: chatRoom.messages[index], chatRoom: chatRoom);
      },
    );
  }
}
