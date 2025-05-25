import styled from "styled-components";
import {useTranslation} from "react-i18next";
import {useRef} from "react";
import {login} from "@myorg/shared/api/auth";
import {useNavigate} from "react-router-dom";
import {useStore} from "../store";
import {getUserInfo} from "@myorg/shared/api/user";
import {fetchAllData} from "../App";

export const SingInCard = styled.div`
        background: var(--card-background-color);
        width: 50vw;
        border-radius: 15px;
        justify-content: center;
        text-align: center;
        align-items: center;
        display: flex;
        flex-direction: column;
        padding: 15px;
    `;
export const SignInPageContainer = styled.div`
        width: 100%;
        height: 100%;
        background: var(--background-color);
        justify-content: center;
        display: flex;
        position: absolute;
        align-items: center;
    `;

export const SignInInputGroup = styled.div`
        background: var(--input-background-color);
        width: 275px;
        align-items: center;
        padding: 15px;
        margin: 10px;
        border-radius: var(--card-border-radius);
        gap: 15px;
        display: flex;
    `

export const SignInInput = styled.input`
        border: none;
        outline: none;
        background: none;
    `;

export const SignInButton = styled.button`
        background: var(--button-background-color);
        border-radius: var(--card-border-radius);
        color: var(--card-background-color);
        padding: 10px;
        width: 250px;
        font-size: 25px;
        font-weight: bold;
        margin: 10px;
    `;

export default function SignInPage() {

    const [t] = useTranslation();
    const {setAuthStateChanged} = useStore();
    const navigate = useNavigate();
    const idRef = useRef();
    const passwordRef = useRef();

    return (
        <SignInPageContainer>
            <SingInCard>
                <h1>
                    {t("signIn")}
                </h1>
                <SignInInputGroup>
                    <i className="fa-solid fa-user"></i>
                    <SignInInput ref={idRef} type={"text"} placeholder={t("id")}/>
                </SignInInputGroup>
                <SignInInputGroup>
                    <i className="fa-solid fa-lock"></i>
                    <SignInInput ref={passwordRef} type={"password"} placeholder={t("password")}/>
                </SignInInputGroup>
                <SignInButton onClick={async () => {
                    await login({
                        id: idRef.current.value,
                        password: passwordRef.current.value,
                        onFailed: (e, statusCode) => {
                            alert(e);
                        },
                        onSuccess: async () => {
                            await getUserInfo({
                                onSuccess: (userInfo) => {
                                    setAuthStateChanged(true);
                            },
                            });
                        },
                    });
                }}>
                    {t("signIn")}
                </SignInButton>
                <SignInButton onClick={() => {
                    navigate("/signUp");
                }}>
                    {t("signUp")}
                </SignInButton>
            </SingInCard>
        </SignInPageContainer>
    );
}