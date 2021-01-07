import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares"

export default {
    Mutation: {
        addComment: async (_, args, {request}) => {
            isAuthenticated(request);
            // args로부터 text, postId 받기
            const { text, postId } = args;
            // user 가져오기
            const { user } = request;
            // comment 만들기
            const comment = await prisma.createComment({
                user: {
                    connect: {
                        id: user.id
                    }
                },
                post: {
                    connect: {
                        id: postId
                    }
                },
                text
            });
            return comment;
        }
    }
}