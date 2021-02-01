import React from "react";
import styled from "styled-components"

// text-transform: uppercase === 대문자로 바꾸는 속성 (한글에선 의미 X)
const Footer = styled.footer`
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-transform: uppercase;
    font-weight: 400;
    font-size: 12px;
    margin: 50px 0px; 
`;

// list 안에 component들을 일렬로 만듦
const List = styled.ul`
    display: flex;
`;

// &:not(:last-child) === 마지막 &를 제외한 나머지 & tag에 margin-right: 20px
const ListItem = styled.li`
    &:not(:last-child) {
        margin-right: 16px;
    }
`;

const Link = styled.a`
    color: ${props => props.theme.grayColor};
`;

const Copyright = styled.span`
    color: ${props => props.theme.grayColor};
`;

export default () => (
    <Footer>
        <List>
            <ListItem>
                <Link href ="#">블로그</Link>
            </ListItem>
            <ListItem>
                <Link href ="#">채용 정보</Link>
            </ListItem>
            <ListItem>
                <Link href ="#">도움말</Link>
            </ListItem>
            <ListItem>
                <Link href ="#">API</Link>
            </ListItem>
            <ListItem>
                <Link href ="#">개인정보처리방침</Link>
            </ListItem>
            <ListItem>
                <Link href ="#">약관</Link>
            </ListItem>
            <ListItem>
                <Link href ="#">인기 계정</Link>
            </ListItem>
            <ListItem>
                <Link href ="#">해시태그</Link>
            </ListItem>
            <ListItem>
                <Link href ="#">위치</Link>
            </ListItem>
            <ListItem>
                <Link href ="#">한국어</Link>
            </ListItem>
            <ListItem>
                <Link href ="#">소개</Link>
            </ListItem>
        </List>
        <Copyright>InstaClone{new Date().getFullYear()} &copy;</Copyright>
    </Footer>
);

