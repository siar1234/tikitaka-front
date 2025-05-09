import logo from "../assets/logo_1024x1024.png";
import styled from "styled-components";
import {useTranslation} from "react-i18next";

export default function SplashScreen() {

    const Container = styled.div`
        justify-content: center;
        align-items: center;
        align-content: center;
        justify-items: center;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        justify-self: center;
    `;

    const [t] = useTranslation();

    const Logo = styled.img`
        width: 10rem;
        height: 10rem;
    `;

    return (
        <Container>
            <Logo src={logo}/>
            <h1>
                {t("tikitaka")}
            </h1>
        </Container>
    );
}