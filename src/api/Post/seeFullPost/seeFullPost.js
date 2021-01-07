import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        // required를 가지지 않고, 인증도 받지 않음
        seeFullPost: async(_, args) => {
            // args로부터 id 받기
            const { id } = args; 

            // fragment의 element 반환
            return prisma.post({id});
        }
    }
}

/*
likeCount, user, post, comments, files의 경우 Post.js에서 해결
*/