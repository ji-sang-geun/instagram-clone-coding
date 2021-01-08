import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        // me는 기본적으로 인증을 하고 확인해야 함. 또한, async는 여기선 사용 안해도 됨
        // _과 __ .... ______  등 underscore(_)는 사용을 안하는 변수라는 것을 의미함.
        me: async (_, __, {request, isAuthenticated}) => {
            isAuthenticated(request);
            // request로 부터 user를 받음
            const { user } = request; 

            const userProfile = await prisma.user({id: user.id});
            const posts = await prisma.user({id: user.id}).posts();
            
            return { user: userProfile, posts };
            
            /*
            // 웹 해킹을 최소화 하기 위해 .$fragment 사용
            // user와 post를 받아오기 위해 $fragment를 사용하는 것임
            return prisma.user({id: user.id}).$fragment(USER_FRAGMENT);
            /*

            /*
            fragment가 타 방법에 비해 속도가 빠름
            
            fragment를 사용하고 싶지 않을 때는, 
            models.graphql 및 datamodel.prisma에 
            type UserProfile {
                user: User!
                posts: [Post!]!
            } 를 추가 한 후,

            me.graphql에 
            type Query {
                me: UserProfile!
            } 를 추가 한 후,

            me: async(_, __, {request, isAuthenticated}) => {
            ...
            const userProfile = await prisma.user({id: user.id});
            const posts = await prisma.user({id: user.id}).posts();

            return { user: userProfile, posts };
            작성
            }
            */
        }
    }
}