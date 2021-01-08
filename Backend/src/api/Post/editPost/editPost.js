import { prisma } from "../../../../generated/prisma-client";

const DELETE = "DELETE";
const EDIT = "EDIT";

export default {
    Mutation: {
        editPost: async(_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            // .graphql에서 인자값들이 있으면 args에서 가져 옴
            // args로부터 id, caption, location, action을 받아 옴
            const { id, caption, location, action } = args;
            // request로부터 user를 받아 옴
            const { user } = request;
            
            const post = await prisma.$exists.post({id, user: {id: user.id}});
            if(post) {
                if(action === EDIT) {
                    // caption, location을 id에 반환
                    return prisma.updatePost({data: {caption, location}, where: {id} });
                } else if (action === DELETE) {
                    // id가 args와 같을 때 반환 
                    return prisma.deletePost({id});
                }
            } else {
                throw Error("You can't do that!");
            }
        }
    }
}

/*
action은 delete할건지, edit할건지 결정을 지어주는 역할을 함
*/