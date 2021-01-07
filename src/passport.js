import dotenv from "dotenv";
import path from "path";
dotenv.config({path: path.resolve(__dirname, ".env")});

/* passport는 인증 관련 모든 일을 담당함. 예를 들어 jwt token이나, 쿠키에서 정보를 가져와 사용자 정보에 저장함. 
token에서 정보를 가져와 express의 request에 연결하고, token을 가져와서 해독한 후 사용자 객체를 request에 추가해준다.
*/ 
// 이 작업은 JWT를 가져와 해석하고 확인하는 작업

import passport from "passport";
import {Strategy, ExtractJwt} from "passport-jwt";
import { prisma } from "../generated/prisma-client";


// JWT는 토큰을 입력받아 정보를 해석함 -> 그 해석한 정보를 콜백 함수로 전달
const jwtOptions = {

    // Authorization 헤더에서 jwt를 찾는 역할을 함
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

// verify 함수 안에서 User를 payload의 정보로 찾아야 함
const verifyUser = async(payload, done) => {
    try {
        const user = await prisma.user({id: payload.id});

        // user가 있으면 done(null, user)를 리턴 
        if (user !== null) return done(null, user);

        // user가 없다면 done(null, false)를 리턴
        else return done(null, false);
    } catch (error) {
        return done(error, false);
    }
};

// passport가 함수에 사용자 정보를 전달해줌
// verifyUser함수가 실행되는데, 함수가 완료되면 사용자 정보가 전달됨 -> 그 정보로 작업이 가능
export const authenticateJwt = (req, res, next) => 
    // 함수
    passport.authenticate("jwt", {sessions: false}, (error, user) => {
        // user가 null or false가 아니라면 req.user = user 
        // 즉, user가 없다면 아무 것도 하지 않음
        if(user) {
            req.user = user;
        }
        // next() 호출
        // verifyUser에서 사용자를 받아온 후, 사용자가 존재하면 사용자 정보를 req 객체에 붙여줌
        next();
    })(req, res, next);

passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();

