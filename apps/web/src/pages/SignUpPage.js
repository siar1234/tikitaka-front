import {SignInButton, SignInInput, SignInInputGroup, SignInPageContainer, SingInCard} from "./SignInPage";
import {register} from "@myorg/shared/api/auth";
import {useTranslation} from "react-i18next";
import {useRef} from "react";
import {useNavigate} from "react-router-dom";

export default function SignUpPage() {

    const [t] = useTranslation();
    const navigate = useNavigate();
    const usernameRef = useRef();
    const idRef = useRef();
    const passwordRef = useRef();

    return (
        <SignInPageContainer>
            <SingInCard>
                <h1>
                    {t("signUp")}
                </h1>
                <SignInInputGroup>
                    <i className="fa-solid fa-user"></i>
                    <SignInInput ref={usernameRef} type={"text"} placeholder={t("username")}/>
                </SignInInputGroup>
                <SignInInputGroup>
                    <i className="fa-solid fa-user"></i>
                    <SignInInput ref={idRef} type={"text"} placeholder={t("id")}/>
                </SignInInputGroup>
                <SignInInputGroup>
                    <i className="fa-solid fa-lock"></i>
                    <SignInInput ref={passwordRef} type={"password"} placeholder={t("password")}/>
                </SignInInputGroup>
                <SignInButton onClick={ async () => {
                    await register({
                        username: usernameRef.current.value,
                        id: idRef.current.value,
                        password: passwordRef.current.value,
                        onSuccess: () => {
                            navigate("/");
                        },
                        onFailed: (e, statusCode) => {
                            alert(e);
                            alert(statusCode);
                            if (statusCode === 401) {

                            }
                        }
                    });
                }}>
                    {t("signUp")}
                </SignInButton>
            </SingInCard>
        </SignInPageContainer>
    );
}