import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        // 새로운 방법, request와 isAuthenticated를 인자로 새롭게 받아줬는데, 이는, server.js에서 인자를 추가해줬음. 따라서, import isAuthenticated를 할 필요 없음.
        // 이것은 인증을 받아야 하므로, request가 필요함
        editUser: (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            // args로부터 username, email, firstName, lastName, bio, avatar 받기
            const { username, email, firstName, lastName, bio, avatar } = args;
            // request로부터 user 받기
            const { user } = request;

            // return은 마지막 statement이기 때문에, 서버가 자동으로 이 promise가 resolve되어, 브라우저에게 결과를 전달하기를 기다려 줌
            // user.id에 data를 반환 
            return prisma.updateUser({where: {id: user.id}, data: {username, email, firstName, lastName, bio, avatar }});

            /* 
            번외
            const user = prisma.updateUser({where: {id: user.id}, data: {username, email, firstName, lastName, bio }});
            return user;
            */
        }
    }
}