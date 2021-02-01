/*
    style만 presenter에 작성
*/

import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import Button from "../../Components/Button";
import Input from "../../Components/Input";

// style - component 
// Wrapper
const Wrapper = styled.div`
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

// Center box
const Box = styled.div`
    ${props => props.theme.whiteBox}
    border-radius: 0px;
    width: 100%;
    max-width: 350px;
`;

// State change Sign up <-> Log in
const StateChanger = styled(Box)`
    text-align: center;
    padding: 20px 0px;
`;

// Link 
const Link = styled.span`
    color: ${props => props.theme.blueColor};
    cursor: pointer;
`;

// &:not(:last-child) === 마지막 &를 제외한 나머지 & tag에 margin-bottom: 7px
const Form = styled(Box)`
    padding: 40px;
    padding-bottom: 30px;
    margin-bottom: 15px;
    width: 100%;
    form {
        width: 100%;
        input {
            width: 100%;
            &: not(:last-child) {
                margin-bottom: 7px;
            }
        }
        button {
            margin-top: 10px;
        }
    }
`;

// action이 logIn이면, Log in, 아니면 Sign Up 
// props === setAction, action, username, password, firstName, lastName, email, onSubmit
export default ({ // password 나중에 update 하기.
    setAction, action, username, firstName, lastName, email, secret, onSubmit
}) => (
    <Wrapper>
        <Form>
            { action === "logIn" && ( 
                <>
                    <Helmet>
                        <title>Log In | Instagram Clone Coding</title>
                    </Helmet>
                    <form onSubmit={onSubmit}>
                        <Input placeholder={"Email"} {...email} type="email" />
                        <Button text={"로그인"} />
                    </form> 
                </>
            )}  
            { action === "signUp" && ( 
                <>
                    <Helmet>
                        <title>Sign Up | Instagram Clone Coding</title>
                    </Helmet>
                    <form onSubmit={onSubmit}>
                        <Input placeholder={"First name"} {...firstName} />
                        <Input placeholder={"Last name"} {...lastName} />
                        <Input placeholder={"Email"} {...email} type="email" />
                        <Input placeholder={"Username"} {...username} />
                        <Button text={"가입"} />
                    </form>
                </> 
            )}
            { action === "confirm" && (
                <>
                <Helmet>
                    <title>Confirm Secret | Instagram Clone Coding</title>
                </Helmet>
                <form onSubmit={onSubmit}>
                    <Input placeholder={"paste your secret"} required {...secret} />
                    <Button text={"확인"} />
                </form>
                </>
            )}
        </Form>

        {action !== "confirm" && (
            <StateChanger> 
            { action === "logIn" ? (
                <>
                계정이 없으신가요?{" "}
                <Link onClick = {() => setAction("signUp")}>가입하기</Link>
                </>
                ) : ( 
                <>
                계정이 있으신가요?{" "}
                <Link onClick = {() => setAction("logIn")}>로그인</Link>
                </> 
                )} 
            </StateChanger>
        )}
    </Wrapper>
);

/*
    <Input placeholder={"Password"} {...password} type="password" />는 추후 update
*/