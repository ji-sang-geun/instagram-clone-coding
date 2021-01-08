import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeFeed: async(_, __, {request, isAuthenticated}) => {
            isAuthenticated(request); 
            // request로부터 user 받기
            const { user } = request;
            // user가 following 하는 사람을 받아옴
            const following = await prisma.user({ id: user.id }).following();
            
            // following 하는 사람과 자기 자신 반환
            return prisma.posts({where: {user: {id_in: [...following.map(user => user.id), user.id] }}, orderBy: "createdAt_DESC"});
        }
    }
}