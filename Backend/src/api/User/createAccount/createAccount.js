import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        createAccount: async(_, args) => {
            const { username, email, firstName = "", lastName = "", bio = "" } = args;
            // user가 존재하는지 확인
            const exists = await prisma.$exists.user({ 
                OR: [
                    {
                        username
                    },
                    {
                        email
                    }
                ]
            });
            if (exists) { // 존재한다면
                throw Error("This username / email is already taken");
            }
            // createUser가 실행되면, return true
            await prisma.createUser({
                username,
                email,
                firstName,
                lastName,
                bio
            });
            return true;
        }
    }
};