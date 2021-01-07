import { prisma } from "../../../generated/prisma-client";

export default {
    User: {
        // posts
        posts: ({ id }) => prisma.user({ id }).posts(),
        // comments
        comments: ({ id }) => prisma.user({ id }).comments(),
        // likes
        likes: ({ id }) => prisma.user({ id }).likes(),
        // following
        following: ({ id }) => prisma.user({ id }).following(),
        // followers
        followers: ({ id }) => prisma.user({ id }).followers(),
        // rooms
        rooms: ({ id }) => prisma.user({ id }).rooms(),
        // followingCount
        followingCount: ({ id }) => prisma.usersConnection({where: {followers_some: { id }}}).aggregate().count(),
        // followersCount
        followersCount: ({ id }) => prisma.usersConnection({where: {following_some: { id }}}).aggregate().count(),

        // custom된 resolver로 하나의 field를 위한 것
        // parent는 나한테 resolver를 call하는 resolver를 줌 그리고 parent는 root 또는 parent라고 불림
        fullName: (parent) => {
            return `${parent.firstName} ${parent.lastName}`;
        },
        // 누가 userProfile을 요구하는지 알고싶기 때문에, request도 추가
        isFollowing: async(parent, __, {request}) => {
            // 인증된 user 객체 받음
            // request로부터 user를 가져옴
            const { user } = request;
            // 상위 Resolver의 데이터(seeUser.js에서 조회할 user id로 반환받은 user 데이터)
            // parent로부터 id를 밖으로 가져오고 parentId라고 불리는 변수에 id를 넣음
            const { id: parentId } = parent;
            try {
                 // 우리가 요청한 유저(user.id)가 database에 있고, following list에 있는 id 중 요청한 유저의 id(parentId)가 있어야 함
                return await prisma.$exists.user({AND:[
                    {id: user.id}, // 사용자
                    {following_some: {id: parentId} } // follow 하는 상대
                ]});
            } catch {
                return false;
            }
        },
        isSelf: (parent, __, {request}) => {
            // 인증된 user 객체 받음
            // request로부터 user를 가져옴
            const { user } = request;
            // 상위 Resolver의 데이터(seeUser.js에서 조회할 user id로 반환받은 user 데이터)
            // parent로부터 id를 밖으로 가져오고 parentId라고 불리는 변수에 id를 넣음
            const { id: parentId } = parent; 
            // 요청한 유저(parentId)가 요청한 사람(request)와 같으면 내 프로필을 요청하는 것
            return user.id === parentId;
        }
    }
}

/* 
prisma 단점 : error를 많이 삼켜서 안드러나게 함. 

따라서, prisma endpoint에서 코드를 복사해 직접 test해보면, 오류를 해결할 수 있음
*/