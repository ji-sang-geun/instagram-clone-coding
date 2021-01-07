import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
    Mutation: {
        confirmSecret: async(_, args) => {
            // args에서 email과 secret 가져오기.
            const {email, secret} = args;
            // prisma.user 함수에 email을 인자로 입력해 사용자 정보 가져오기.
            const user = await prisma.user({email});
            // user.loginSecret === secret JWT TOKEN return 
            if(user.loginSecret === secret) {
                await prisma.updateUser({
                    where: {id: user.id}, 
                    data: {
                        loginSecret: ""
                    }
                });
                return generateToken(user.id);
            }
            // throw Error message
            else throw Error("Wrong email/secret combination");
        }
    }
}