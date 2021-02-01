// useEffect는 reacthooks의 componentDidMount 같은 것
import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
// comment 추가용
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter"; 
import { ADD_COMMENT, TOGGLE_LIKE } from "./PostQueries";
import { useMutation } from "@apollo/react-hooks";
import { toast } from "react-toastify";

const PostContainer = ({
    id, user, files, likeCount, isLiked, comments, createdAt, caption, location
}) => {
    // isLiked나 likeCount는 request를 기다리지 않고 업데이트 해야하기 때문에 state에 복사함
    // 반응을 기록하는 척해야 하므로 request를 기다리는 방법보다 더 나은 방법
    const [isLikedS, setIsLiked] = useState(isLiked);
    const [likeCountS, setLikeCount] = useState(likeCount);
    const [currentItem, setCurrentItem] = useState(0);
    
    // Comments List를 만듦, useState는 빈 배열로 받음
    const [selfComments, setSelfComments] = useState([]);
    
    const comment = useInput("");
    
    const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
        variables: {postId: id}
    });
    const [addCommentMutation] = useMutation(ADD_COMMENT, {
        variables: {postId: id, text: comment.value}
    });
    
    // slide function
    const slide = async () => {
        const totalFiles = files.length;
        if(currentItem === totalFiles - 1) { // currentItem은 현재 사진의 순서
            setTimeout(() => setCurrentItem(0), 3000); 
        } else {
            setTimeout(() => setCurrentItem(currentItem + 1), 3000);
        }
    }
    
    // slide했을 때 currentItem이 어떤건지 확인
    // componentDidMount에서 작동함, currentItem이 변할 때 다시 동작
    useEffect(() => { 
        slide();
    }, [currentItem]);

    const toggleLike = () => {
        toggleLikeMutation();

        if(isLikedS === true) { // 좋아요 한 것을 누르면 좋아요가 취소되게끔 함 (database로 부터 올수 없고 state에서 와야하니까 isLike가 아닌 isLikeS를 사용)
            setIsLiked(false);
            setLikeCount(likeCountS - 1);
        } else {
            setIsLiked(true);
            setLikeCount(likeCountS + 1);
        }
    };

    // 어떤 key가 눌렸는지 알아야 하고, Enter가 눌렸는지도 알아야 함
    // database에 comment가 보내질 때까지 잠깐 기다리도록 async
    const onKeyPress = async event => {
        // Enter의 event는 13이므로, if문 작성
        const {which} = event;
        if(which === 13) { // 엔터를 누르는 경우 (어떤 키가 눌렸는지 알려주는 것)
            event.preventDefault(); // 이벤트를 취소할 수 있는 경우 이벤트의 전파를 막지않고 그 이벤트를 취소함
            try {
                const { data: { addComment } } = await addCommentMutation();
                setSelfComments([...selfComments, addComment]);
                comment.setValue(""); // erase Comment and make blank
            } catch {
                toast.error("댓글을 달 수 없습니다.");
            }
        }
    };

    //post return
    return ( 
    <PostPresenter 
        user={user}
        files={files}
        likeCount={likeCountS}
        isLiked={isLikedS}
        comments={comments}
        createdAt={createdAt}
        newComment={comment}
        setIsLiked={setIsLiked}
        setLikeCount={setLikeCount}
        caption={caption}
        location={location}
        currentItem={currentItem}
        toggleLike={toggleLike}
        onKeyPress={onKeyPress}
        selfComments={selfComments}
    />);
};

PostContainer.propTypes = {
    // id는 string이어야 하고 꼭 필요함
    id: PropTypes.string.isRequired,
    // user은 특정 형태를 가지므로, shape이고, 꼭 필요하므로 isRequired
    user: PropTypes.shape({
            id: PropTypes.string.isRequired,
            avatar: PropTypes.string,
            username: PropTypes.string.isRequired
        }).isRequired,
    // files는 file들의 집합이므로 array type이고, 꼭 필요하므로 isRequired
    files: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
        })
    ).isRequired,
    likeCount: PropTypes.number.isRequired,
    isLiked: PropTypes.bool.isRequired,
    // comments는 comment들의 집합이므로 array type, 꼭 필요하므로 isRequired
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            // user은 특정 형태를 가지므로, shape이고, 꼭 필요하므로 isRequired
            user: PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    username: PropTypes.string.isRequired
                }).isRequired
        })
    ).isRequired,
    caption: PropTypes.string.isRequired,
    location: PropTypes.string,
    createdAt: PropTypes.string.isRequired
};

export default PostContainer;