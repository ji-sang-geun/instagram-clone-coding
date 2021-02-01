import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FatText from "../../Components/FatText";
import Loader from "../../Components/Loader";
import UserCard from "../../Components/UserCard";
import SquarePost from "../../Components/SquarePost";

const Wrapper = styled.div`
    height: 50vh;
`;

const Section = styled.div`
    margin-bottom: 50px;
    display: grid;
    grid-gap: 25px;
    grid-template-columns: repeat(4, 200px);
    grid-template-rows: 200px;
    grid-auto-rows: 200px;
`;

const PostSection = styled(Section)`
    grid-template-columns: repeat(4, 200px);
    grid-template-rows: 200px;
    grid-auto-rows: 200px;
`;

// 많은 것들을 보내기 위한 proptype
const SearchPresenter = ({ searchTerm, loading, data }) => {
    if (searchTerm === undefined) { 
        return <Wrapper>
            <FatText text={"무언가를 검색해보세요!"} />
        </Wrapper>
    } else if (loading === true) {
        return <Wrapper>
            <Loader />
        </Wrapper>
    } else if (data && data.searchUser && data.searchPost) {
        return <Wrapper>
            <Section>
                {data.searchUser.length === 0 ? (
                    <FatText text="사용자를 찾을 수 없습니다." />
                ) : (
                    data.searchUser.map(user => (
                        <UserCard 
                            key={user.id} 
                            username={user.username}
                            isFollowing={user.isFollowing} 
                            url={user.avatar} 
                            isSelf={user.isSelf} 
                            id={user.id}
                        />
                    ))
                )}
            </Section>
            <PostSection>
                {data.searchPost.length === 0 ? (
                    <FatText text="게시물을 찾을 수 없습니다." />
                ) : (
                    data.searchPost.map(post => (
                    <SquarePost 
                        key={post.id}
                        likeCount={post.likeCount} 
                        commentCount={post.commentCount} 
                        file={post.files[0]} 
                    />
                    ))
                )}
            </PostSection>
        </Wrapper>
    }
};

SearchPresenter.propTypes = {
    searchTerm: PropTypes.string,
    loading: PropTypes.bool
};

export default SearchPresenter;