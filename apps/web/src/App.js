import logo from './logo.svg';
import './App.css';
import lightTheme from "./assets/light-theme.json";
import styled from "styled-components";
import ComponentFromTheme from "./ComponentFromTheme";
import {useState} from "react";
import MainPage from "./pages/MainPage";
import Forum from "./pages/Forum";
import {useStore} from "./store";
import {Route, Routes} from "react-router-dom";

export const RelativeLayout = styled.div`
        position: relative;
    `;

export const VerticalLinearLayout = styled.div`
        display: flex;
        flex-direction: column;
    `;

export const HorizontalLinearLayout = styled.div`
        display: flex;
        flex-direction: row;
    `;

export const IconButton = styled.button`
        background: transparent;
        cursor: pointer;
        border: none;
        outline: none;
    `;

function App() {

  const AppLayout = styled.div`
      width: 100%;
      height: 100%;
  `;

  const sharedComponents = [];

  for(const item of lightTheme["shared-components"].web) {
    sharedComponents.push(  <ComponentFromTheme elementData={item} />);
  }

  const styleData = {};
  for(const styleDataItemKey in lightTheme.style.web) {
    styleData[styleDataItemKey] = lightTheme.style.web[styleDataItemKey];
    document.body.style[styleDataItemKey] = styleData[styleDataItemKey];
  }

  return (
      <AppLayout>
          <Routes>
              <Route path="/" element={<MainPage/>} />
              <Route path="/forum" element={<Forum/>} />
          </Routes>
          {sharedComponents}
      </AppLayout>
  );
}

export default App;
