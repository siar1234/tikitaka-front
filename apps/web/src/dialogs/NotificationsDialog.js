import {useStore} from "../store";
import styled from "styled-components";
import convertedStyle from "../styleUtils";
import {IconButton} from "../App";
import ComponentFromTheme from "../ComponentFromTheme";
import {acceptFriend} from "@myorg/shared/api/friend";
export default function NotificationsDialog({isOpen, onClose}) {

    const {notifications, theme} = useStore();
    const elementData = theme["notifications"].web;

    if (!isOpen) return null;

    const PopupOverlay = styled.div`

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(-50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;

    const overlayStyle = convertedStyle(elementData["overlay"].style);
    const boxStyle = convertedStyle(elementData.box.style);
    const closeButtonStyle = convertedStyle(elementData["close-button"].style);

    const itemData = elementData["items"].item;
    const itemStyle = itemData.style;

    const children = [];

    for(const notification of notifications) {
        const itemChildren = [];
        for(const item of itemData.children) {
            const replacements = {
                "@title": notification.title,
            };
            itemChildren.push(
                <ComponentFromTheme elementData={item} replacements={replacements} />
            );
        }
        const child = (
            <div style={itemStyle} onClick={ async () => {
                switch (notification.type) {
                    case "request-friend":
                        const userId = notification.data;
                        await acceptFriend({
                            id: userId,
                            onFailed: (error, response) => {
                                alert(error);
                            },
                            onSuccess: () => {
                                alert("TTAAKKKKK!!!!!!");
                            }
                        });
                        break;
                }
            }}>
                {itemChildren}
            </div>
        );
        children.push(child);
    }

    return (
      <PopupOverlay open={isOpen} onClick={onClose} style={overlayStyle}>
          <div style={boxStyle} onClick={(e) => e.stopPropagation()}>
              <IconButton style={closeButtonStyle} onClick={onClose} >
                  <i className={"fa-solid fa-circle-xmark"}></i>
              </IconButton>
              <ComponentFromTheme elementData={elementData.items}>
                  {children}
              </ComponentFromTheme>
          </div>
      </PopupOverlay>
    );
}