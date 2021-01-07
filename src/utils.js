import dotenv from "dotenv";
import path from "path";
dotenv.config({path: path.resolve(__dirname, ".env")});

import { adjectives, nouns } from "./words"
import nodemailer from "nodemailer";
import mgTransport from "nodemailer-mailgun-transport";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`; // 함수의 결과로 반환
};

// 인자로 email을 입력 받음. email은 주소만 말하는 것이 아닌 필요한 모든 것이 담김
// sendMail은 외부에서 사용되지 않기 때문에 export 하지 않아도 된다.
// sendSecretMail을 사용
const sendMail = (email) => {
    const options = {
        auth: {
            api_key: process.env.MAILGUN_API,
            domain: process.env.MAILGUN_DOMAIN,
        },
    };
    const client = nodemailer.createTransport(mgTransport(options));
    return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
    const email = {
        from: "INSTA@gmail.com",
        to: address,
        subject: "Login Secret for Prismagram",
        html: `Hello! Your login Secret is <strong>${secret}</strong>. <br/> Copy Paste on the app/website to log in`
    };
    return sendMail(email);
};

// JWT를 생성하는 작업 (jwt가 id를 암호화해서 token을 만들어줌)
export const generateToken = (id) => jwt.sign({id}, process.env.JWT_SECRET);