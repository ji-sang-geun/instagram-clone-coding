import { gql } from "apollo-boost";

// 이렇게 query를 생성 가능함
export const SEARCH = gql`
    query search($term: String!) {
        searchPost(term: $term) {
            id
            files {
                url
            }
            likeCount
            commentCount
        }
        searchUser(term: $term) {
            id
            avatar
            username
            isFollowing
            isSelf
        }
    }
`;


