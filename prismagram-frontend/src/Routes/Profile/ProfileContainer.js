import React from "react";
import { gql } from "apollo-boost";
import { withRouter } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";
import ProfilePresenter from "./ProfilePresenter";

// query
const GET_USER = gql`
    query seeUser($username: String!) {
        seeUser(username: $username) {
            id
            avatar
            username
            fullName
            isFollowing
            isSelf
            bio
            followingCount
            followersCount
            postsCount
            posts {
                id
                files {
                    url
                }
                likeCount
                commentCount
            }
        }
    }
`;

export const LOG_OUT = gql`
    mutation logUserOut{
        logUserOut @client
    }
`;

// withRouter가 필요한 이유: user가 누구인지 알아야 하기 때문
// props.match.params.username이 필요
export default withRouter(({match: { params: { username } }}) => {
    const { data, loading } = useQuery(GET_USER, { variables : { username }});
    const [logOut] = useMutation(LOG_OUT);
    return <ProfilePresenter loading={loading} logOut={logOut} data={data} />;
});