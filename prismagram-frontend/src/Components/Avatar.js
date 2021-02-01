import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const getSize = (size) => {
    // let은 블록 유효 범위를 갖는 지역 변수 선언, 선언과 동시에 임의 값으로 초기화 가능
    let number; 

    if(size === "sm") {
        number = 32;
    } else if(size === "md") {
        number = 56;
    } else if(size === "lg") {
        number = 150;
    }

    return `
        width: ${number}px;
        height: ${number}px;
        `
}

const Container = styled.div`
    ${props => getSize(props.size)}
    background-image: url(${props => props.url});
    background-size: cover;
    border-radius: 50%;
`;

// Avatar에 className을 준다면 Avatar 확장 가능
const Avatar = ({ size = "sm", url, className }) => ( 
    <Container className={className} size={size} url={url} /> 
);

Avatar.propTypes = {
    size: PropTypes.oneOf(["sm", "md", "lg"]), 
    url: PropTypes.string.isRequired
};

export default Avatar;

