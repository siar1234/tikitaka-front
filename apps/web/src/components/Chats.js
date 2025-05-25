import {VerticalLinearLayout} from "../App";
import ComponentFromTheme from "../ComponentFromTheme";
import convertedStyle from "../styleUtils";
import {useStore} from "../store";
import {defaultChattingThumbnail} from "@myorg/shared/api/media";
import styled from "styled-components";
import {getChatRoomMessages} from "@myorg/shared/api/chat";

export default function Chats({elementData}) {

    const Item = styled.div`
        :hover {
            cursor: pointer;
            text-decoration: underline;
        }
    `;

    const children = [];
    const itemStyle = convertedStyle(elementData.item.style);
    const thumbnailStyle = convertedStyle(elementData.item.thumbnail.style);
    const titleStyle = convertedStyle(elementData.item.title.style);
    const {chats, setChatRoom, stompClient, chatRoom} = useStore();
    for(const chat of chats) {

        children.push(
            <Item style={itemStyle}>
                <img style={thumbnailStyle} src={chat.thumbnail ?? defaultChattingThumbnail} alt={chat.chatName} />
                <div style={titleStyle} onClick={ async () => {
                    await getChatRoomMessages({
                        onSuccess: (messages) => {
                            if(typeof messages !== "undefined") {
                                setChatRoom({
                                    title: chat.chatName,
                                    subtitle: "접속중",
                                    messages: messages,
                                    thumbnail: defaultChattingThumbnail,
                                    chatId: chat.chatId
                                });

                                if(stompClient !== null) {
                                    stompClient.subscribe(`/topic/chatting/${chat.chatId}`, (messageOutput) => {
                                        messages.push(JSON.parse(messageOutput.body));
                                       setChatRoom({
                                           chatId: chat.chatId,
                                           messages: messages,
                                           thumbnail: defaultChattingThumbnail,
                                           title: chat.chatName,
                                           subtitle: "접속중",
                                       });
                                    });
                                }

                            }
                        },
                        chatId: chat.chatId,
                    });
                }}>{chat.chatName}</div>
            </Item>
        );
    }

    const styleData = convertedStyle(elementData.style);

    return (
        <VerticalLinearLayout style={styleData}>
            {children}
        </VerticalLinearLayout>
    );
}