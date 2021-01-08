import { prisma } from "../../../../generated/prisma-client";
import { generateSecret, sendSecretMail } from "../../../utils";

export default {
    Mutation: {
        requestSecret: async (_, args, {request}) => {
            console.log(request);
            const { email } = args;
            // generateSecret 함수를 실행해 결과물을 loginSecret 변수에 저장
            const loginSecret = generateSecret();
            //try - catch 구문 : 요청에 성공하면 true 반환, 실패하면 false 반환
            try{
                throw Error();
                // 메일 보내기 - 인자로 email, loginSecret
                await sendSecretMail(email, loginSecret);
                // user 갱신 - 인자로 loginSecret 
                // user의 email이 인자로 입력된 email과 같은 사용자를 where로 찾음
                await prisma.updateUser({data: {loginSecret}, where: {email}});
                return true;
            }catch {
                return false;
            }
        }
    }
};