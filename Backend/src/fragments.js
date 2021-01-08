// fragment를 사용 안하기 위함 


export const USER_FRAGMENT = `
    id
    avatar
    username
`;

/*
export const COMMENT_FRAGMENT = `
    id
    text
    user {
            ${USER_FRAGMENT}
     }

`;

export const FILE_FRAGMENT = `
    id
    url
`;
*/

export const MESSAGE_FRAGMENT = `
    id
    text
    to {
        ${USER_FRAGMENT}
    }
    from {
        ${USER_FRAGMENT}
    }
`;
/*
// fragment PostParts on Post 오타 안나게 주의
export const FULL_POST_FRAGMENT = `
    fragment PostParts on Post {
        id 
        location
        caption
        user {
            ${USER_FRAGMENT}
        }
        comments {
            ${COMMENT_FRAGMENT}
        }
        files {
            ${FILE_FRAGMENT}
        }
    }
`;
*/
// fragment RoomParts on Room 오타 안나게 주의
export const ROOM_FRAGMENT = `
    fragment RoomParts on Room {
        id
        participants {
            ${USER_FRAGMENT}
        }
        messages {
            ${MESSAGE_FRAGMENT}
        }
    }
`;



/* 
만약 엄청 깊은 관계를 가지고 있는 Query를 작성하거나, relationship을 맺고 싶거나, fragments를 사용하기 싫으면 
$fragment 구문을 사용하면 안되고, 다른 구문을 사용해야만 함 
*/

// post, 사진, 모든 것을 다 포함시킴 - 미래를 위한 형식
// fragment UserParts on User 오타 안나게 주의
/*
export const USER_FRAGMENT = ` 
    fragment UserParts on User { 
        id 
        username
        email
        firstName
        lastName
        fullName
        amIFollowing
        bio 
        posts {
            id
            caption
        }
    }
`;
*/