import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        upload: async(_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            // request로부터 user 받기
            const { user } = request;
            // args로부터 caption, files 받기
            const { caption, files } = args;
            const post = await prisma.createPost({
                caption, 
                user: {
                    connect: {
                        id: user.id
                    }
                }
            });
            // files가 많은 url들의 array임
            files.forEach(async(file) => { 
                await prisma.createFile({
                    // file이 url
                    url: file,
                    // post에 연결
                    post: {
                        connect: {
                            id: post.id
                        }
                    }
                })
            });
            return post;
        }
    }
}