import { prisma } from "../../../generated/prisma-client";

export default {
    // post를 받을 때 마다 parent는 저 post parent가 됨
    // 그리고 request를 받고 like가 있는지 확인 후 요청하는 user의 user.id가 있는 resolver와 그 밑에 존재하는 id는 parent id와 같아야 함
    Post: {
        // user
        user: ({ id }) => prisma.post({ id }).user(),
        // comments
        comments: ({ id }) => prisma.post({ id }).comments(),
        // files
        files: ({ id }) => prisma.post({ id }).files(),
        // likes
        likes: ({ id }) => prisma.post({ id }).likes(),

        /*
        이런 형식도 가능
        files: (parent, __) => prisma.post({id: parent.id}).files(),
        */

        // 첫번째로 parent를 넣고, 그 다음 매개 변수는 없고, request를 넣음
        isLiked: (parent, __, {request}) => {
            // 인증된 user 객체 받음
            // request로부터 user를 가져옴
            const { user } = request;
            // parent(post)로부터 image의 id를 가져옴
            const { id } = parent;

            // 현재 인증된 user가 해당 post에 대해 좋아요를 했는지 확인
            return prisma.$exists.like({
                AND: [{ 
                    user:{
                        id: user.id
                    }
                },
                {
                    post: {
                        id
                    }
                }]
            });
        },
        // 모든 likeCount는 prisma를 기다림 
        likeCount: (parent, __) => prisma.likesConnection({where: { post: {id: parent.id}}}).aggregate().count()

    }
}