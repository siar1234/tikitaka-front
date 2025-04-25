import {useStore} from "../store";
import styled from "styled-components";
import convertedStyle from "../styleUtils";
import {IconButton} from "../App";
import ComponentFromTheme from "../ComponentFromTheme";
export default function NotificationsDialog({isOpen, onClose}) {

    const {notifications} = useStore();
    const {theme} = useStore();
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

    const children = [];

    for(const notification of notifications) {
        const replacements = {
          "@title": notification.title,
        };
        const child = (
            <ComponentFromTheme elementData={itemData} replacements={replacements} />
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