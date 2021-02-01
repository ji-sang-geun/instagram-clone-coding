import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import FatText from "../../Components/FatText";
import FollowButton from "../../Components/FollowButton";
//import ProfileButton from "../../Components/ProfileButton";
import SquarePost from "../../Components/SquarePost";
import Button from "../../Components/Button";

const Wrapper = styled.div`
    min-height: 60vh;
`;

const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 80%;
    margin: 0 auto;
    margin-top: 90px;
    margin-bottom: 40px;
`;

const HeaderColumn = styled.div`

`;

const UsernameRow = styled.div`
    display: flex;
    align-items: center;
`;

const Username = styled.span`
    font-size: 28px;
    display: block;
`;

const Counts = styled.ul`
    display: flex;
    margin: 10px 0px;
`;

const Count = styled.li`
    font-size: 16px;
    &:not(:last-child) {
        margin-right: 10px;
    }
`;

const FullName = styled(FatText)`
    font-size: 16px;
`;

const Bio = styled.p`
    margin: 10px 0px;
`;

const Posts = styled.div`
    display: grid;
    grid-gap: 31px;
    grid-template-columns: repeat(3, 293px);
    grid-template-rows: 293px;
    grid-auto-rows: 293px;
`;

export default ({loading, data, logOut}) => {
    if(loading === true) {
        return (
            <Wrapper> 
                <Loader /> 
            </Wrapper> 
        );
    } else if (!loading && data && data.seeUser) {
        // console.log(data); 
        // loading이 아니면 data를 보여주게 만듦 (data로부터 정보를 받음)
        const { seeUser : { 
            id,
            avatar,
            username,
            email,
            fullName,
            firstName,
            lastName,
            isFollowing,
            isSelf,
            bio,
            followingCount,
            followersCount,
            postsCount,
            posts
        } } = data;
        return (
            <Wrapper>
            <Helmet>
                <title>
                    {username} | Instagram Clone Coding
                </title>
            </Helmet>
                <Header>
                    <HeaderColumn>
                        <Avatar size="lg" url={avatar} />
                    </HeaderColumn>
                    <HeaderColumn>
                        <UsernameRow>
                            <Username> {username} </Username>
                            {isSelf ? <Button onClick={logOut} text={"로그 아웃"} /> : <FollowButton id={id} isFollowing={isFollowing} />}
                        </UsernameRow>
                        <Counts>
                            <Count>
                                게시물 <FatText text={String(postsCount)} /> 
                            </Count>
                            <Count>
                                팔로워 <FatText text={String(followersCount)} /> 
                            </Count>
                            <Count>
                                팔로우 <FatText text={String(followingCount)} /> 
                            </Count>
                        </Counts>
                        <FullName text={fullName} />
                        <Bio>{bio}</Bio>
                    </HeaderColumn>
                </Header>
                <Posts>
                    {posts && 
                        posts.map(post => (
                        <SquarePost 
                            key={post.id}
                            likeCount={post.likeCount}
                            commentCount={post.commentCount}
                            file={post.files[0]}
                        /> 
                        ))}
                </Posts>
            </Wrapper>
        );
    }
};