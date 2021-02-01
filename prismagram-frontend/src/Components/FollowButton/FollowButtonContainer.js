import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/react-hooks";
import { FOLLOW, UNFOLLOW } from "./FollowButtonQueries";
import FollowButtonPresenter from "./FollowButtonPresenter";

// follow를 하고 싶으면 following 중인지 먼저 알아야 함
const FollowButtonContainer = ({isFollowing, id}) => {
    // following을 업데이트 하기 위해 state를 복사
    const [isFollowingS, setIsFollowing] = useState(isFollowing);

    // function으로 하기 위해선 []을 감싸야 함
    const [followMutation] = useMutation(FOLLOW, { variables: { id } });
    const [unfollowMutation] = useMutation(UNFOLLOW, { variables: { id } });

    // click
    const onClick = () => {
        // following이면 unfollow하고 unfollowing이면 follow함 
        if(isFollowingS === true) {
            setIsFollowing(false);
            unfollowMutation();
        } else {
            setIsFollowing(true);
            followMutation();
        }
    };
    // props가 아닌 state를 isFollowing에 줌
    return <FollowButtonPresenter onClick={onClick} isFollowing={isFollowingS} />;
};

FollowButtonContainer.propTypes = {
    isFollowing: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired
}

export default FollowButtonContainer;

