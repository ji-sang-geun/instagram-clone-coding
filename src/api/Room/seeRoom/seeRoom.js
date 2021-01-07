import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeRoom: async(_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            // args로부터 id 받기
            const { id } = args;
            // request로부터 user 받기
            const { user } = request; 

            const canSee = await prisma.$exists.room({
                participants_some: {
                    id: user.id
                }
            });
            // participants 안에 있다는 의미
            if(canSee) {
                return prisma.room({id});
            } else{
                throw Error("You can't see this!");
            }
        }
    }
}