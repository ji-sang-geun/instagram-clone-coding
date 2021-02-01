import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import TextareaAutosize from "react-autosize-textarea";
import Avatar from "../Avatar";
import FatText from "../FatText";
import { Comment as CommentIcon, HeartEmpty, HeartFull } from "../Icons";

const Post = styled.div`
    ${props => props.theme.whiteBox};
    width: 100%;
    max-width: 615px;
    user-select: none;
    &: first-child {
        margin-top: 90px;
    }
    margin-bottom: 30px;
    a {
        color: inherit;
    }
`;

const Header = styled.header`
    padding: 15px;
    display: flex;
    align-items: center;
`;

const UserColumn = styled.div`
    margin-left: 10px;
`;

const Location = styled.span`
    display: block;
    margin-top: 5px;
    font-size: 12px;
`;

const Files = styled.div`
    position: relative;
    padding-bottom: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex-shrink: 0;
`;

// image를 background image로 넣음
const File = styled.img`
    max-width: 100%;
    width: 100%;
    height: 615px;
    position: absolute;
    top: 0;
    background-image: url(${props => props.src});
    background-size: cover;
    background-position: center;
    opacity: ${props => (props.showing ? 1 : 0)};
    transition: opacity .5s linear;
`;

const Button = styled.span`
    cursor: pointer;
`;

const Meta = styled.div`
    padding: 15px;
`;

const Buttons = styled.div`
    ${Button} {
        &: first-child {
            margin-right: 10px;
        }
    }
    margin-bottom: 10px;
`;

const Timestamp = styled.span`
    font-weight: 400;
    text-transform: uppercase;
    opacity: 0.5;
    display: block;
    font-size: 12px;
    margin: 10px 0px;
    padding-bottom: 10px;
    border-bottom: ${props => props.theme.lightgrayColor} 1px solid;
`;

// 이 package 만든 사람이 내가 class name을 전달할 수 있게 해주면 동작하는 것
// 오직 괄호 안에 있는 component가 class name이라는 이름의 prob을 가지고 있을 때만 가능
// &: focus는 사용자가 클릭 또는 탭하거나, 키보드 tab키로 선택했을 때 발동
// resize: none은 오른쪽 아래 이상한 문양 제거할 때 사용
const Textarea = styled(TextareaAutosize)`
    border: none;
    width: 100%;
    resize: none; 
    font-size: 14px;
    &: focus {
        outline: none;
    }
`;

const Comments = styled.ul`
    margin-top: 10px;
`;

const Comment = styled.li`
    margin-bottom: 10px;
    span {
        margin-right: 7px;
    }
`;

// index는 map 위에 가지고 있는 counter인데, 어떤 item 위에 있는지 알려줌
export default ({
    user:{username, avatar}, 
    location, 
    files, 
    isLiked, 
    likeCount, 
    createdAt, 
    newComment, 
    currentItem, 
    toggleLike,
    onKeyPress,
    comments,
    selfComments
}) => (
    <Post>
        <Header>
            <Link to={`/${username}`}>
                <Avatar size="sm" url={avatar}/>
            </Link>
            <UserColumn>
                <Link to={`/${username}`}>
                    <FatText text={username} />
                </Link>
                <Location>{location}</Location>
            </UserColumn>
        </Header>
        <Files>
            {files && files.map((file, index) => <File key={file.id} src={file.url} showing={index === currentItem}/>)}
        </Files>
        <Meta>
            <Buttons>
                <Button onClick={toggleLike}>
                    {isLiked ? <HeartFull /> : <HeartEmpty />}
                </Button>
                <Button>
                    <CommentIcon />
                </Button>
            </Buttons>
            <FatText text={likeCount === 1 ? "좋아요 1개" : `좋아요 ${likeCount}개`} />
            {comments && (
                <Comments>
                    {comments.map(comment => (
                        <Comment key={comment.id}>
                            <FatText text={comment.user.username} />
                            {comment.text}
                        </Comment>
                        )
                    )}
                    {selfComments.map(comment => (
                        <Comment key={comment.id}>
                            <FatText text={comment.user.username} />
                            {comment.text}
                        </Comment>
                        )
                    )}
                </Comments>
            )}
            <Timestamp>{createdAt}</Timestamp>
            <Textarea placeholder={"댓글 달기..."} value={newComment.value} onChange={newComment.onChange} onKeyPress={onKeyPress} />
        </Meta>
    </Post>)