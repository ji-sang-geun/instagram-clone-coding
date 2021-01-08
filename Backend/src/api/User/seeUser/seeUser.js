import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        // 프로필은 누구나 볼 수 있으므로, 인증할 필요가 없음
        seeUser: async(_, args) => {
            // args로부터 id 받기
            const { id } = args;
            
            return prisma.user({ id });


            /*
            // return은 마지막 statement이기 때문에, 서버가 자동으로 이 promise가 resolve되어, 브라우저에게 결과를 전달하기를 기다려 줌
            return prisma.user({id});
            */

            /*
            fragment가 타 방법에 비해 속도가 빠름
            
            fragment를 사용하고 싶지 않을 때는, 
            models.graphql 및 datamodel.prisma에 
            type UserProfile {
                user: User!
                posts: [Post!]!
            } 를 추가 한 후,

            seeUser.graphql에 
            type Query {
                seeUser(id: String!): UserProfile!
            } 를 추가 한 후,

            me: async(_, args) => {
            ...
            const user = await prisma.user({id});
            const posts = await prisma.user({id}).posts();

            return { user, posts };
            작성
            }
            */
        }
    }
}