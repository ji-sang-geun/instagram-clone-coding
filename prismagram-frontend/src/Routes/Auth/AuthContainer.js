/*
    react hooks 덕분에 await로 더 직관적이게 코드를 작성할 수 있었음 
    모든 state, query, data, hooks => container에 둘 것
*/

import React, {useState} from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { CONFIRM_SECRET, CREATE_ACCOUNT, LOCAL_LOG_IN, LOG_IN } from "./AuthQueries";
import { useMutation } from "@apollo/react-hooks";
import { toast } from "react-toastify";

// action이 logIn이면, Log in, 아니면 Sign Up
export default () => {
    const [action, setAction] = useState("logIn");
    const username = useInput("");
    // const password = useInput("");
    const firstName = useInput("");
    const lastName = useInput("");
    const email = useInput("");
    const secret = useInput("");

    // useInput.js는 value랑 onChange를 주는데, text value를 원하면, email.value여야만 함
    // useMutation에서 발생 (update는 mutation이 발생할 때 실행하는 함수)
    const [requestSecretMutation] = useMutation(LOG_IN, {
        variables: { 
            email: email.value 
        } 
    });

    const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
        variables: {
            email: email.value,
            username: username.value,
            firstName: firstName.value,
            lastName: lastName.value
        }
    });

    const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
        variables: {
            secret: secret.value,
            email: email.value
        }
    });

    // localLogInMutation은 variable을 가지고 있지 않음
    // why? : token을 useInput에 넣지 않았고, token은 오로지 mutation을 호출한 후 confirmSecret을 호출한 후에 생김
    const [localLogInMutation] = useMutation(LOCAL_LOG_IN);

    // apllo는 mutation을 가지고 있고 onComplete, onError와 같은 Component들이 있음
    // try catch에서는 await === onComponent, catch === onError
    // onSubmit은 event(e)를 가짐
    // async를 사용하면 try catch를 통해 에러를 잡을 수 있음
    const onSubmit = async e => {
        e.preventDefault(); // 페이지가 새로고침되길 원하지 않으므로 event가 preventDefault이길 원함
        
        // action이 logIn 이면 실행
        if(action === "logIn") {
            // email.value가 empty가 아니면 requestSecret 호출
            if(email.value !== "") {
                try {
                    const { data: { requestSecret } } = await requestSecretMutation();
                    // requestSecret이 아니면
                    if(!requestSecret) { 
                        // 옆에 메세지로 출력
                        toast.error("You don't have an account yet, Create one");
                        // 3초 후에 setAction이 실행되도록 함
                        setTimeout(() => setAction("signUp"), 3000);
                    } else {
                        toast.success("Check your inbox for your login secret");
                        setAction("confirm");
                    }
                } catch {
                    toast.error("Can't request secret, try again");
                }
            } else {
                toast.error("Email is required");
            }
        } else if(action === "signUp") {
            // (email,username,firstName,lastName).value,가 empty가 아니면 createAccount 호출
            if(
                email.value !== "" &&
                username.value !== "" &&
                firstName.value !== "" &&
                lastName.value !== ""
            ) {
                try {
                    const { data: {createAccount} } = await createAccountMutation();

                    // createAccount가 아니면
                    if(!createAccount) {
                        toast.error("Can't create Account");
                    } else {
                        toast.success("Account created! Log In now");
                        // 3초 후에 setAction이 실행되도록 함
                        setTimeout(() => setAction("logIn"), 3000);
                    }

                } catch (e) {
                    toast.error(e.message);
                }
            } else {
                toast.error("All field are required");
            }
        } else if(action === "confirm") {
            // secret.value가 empty가 아니면 requestSecret 호출
            if(secret.value !== "") {
                try {
                    // await에서 token을 얻음
                    const { data: {confirmSecret: token} } = await confirmSecretMutation();
                    
                    // TO DO: log user in
                    // token이 empty나 undefined가 아닌 경우
                    if(token !== "" && token !== undefined ) {
                        // token은 localLogInMutation의 variables가 됨
                        localLogInMutation({variables: {token}});
                    } else {
                        throw Error();
                    }
                } catch {
                    toast.error("Can't confirm secret, check again");
                }
            }
        } 
    };

    return (
        <AuthPresenter 
            setAction={setAction} 
            action={action} 
            username={username} 
            firstName={firstName} 
            lastName={lastName} 
            email={email}
            secret={secret}
            onSubmit={onSubmit}
        />
    );
};

/* 
    password={password}는 나중에 추후 update
*/