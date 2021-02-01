import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import Input from "./Input";
import useInput from "../Hooks/useInput";
import { Compass, HeartEmpty, Home, Logo, Message, User } from "./Icons";
import { useQuery } from "@apollo/react-hooks";
import { ME } from "../SharedQueries";

const Header = styled.header`
    width: 100%;
    border: 0;
    position: fixed;
    top: 0;
    left: 0;
    background-color: white;
    border-bottom: ${props => props.theme.boxBorder};
    border-radius: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 0px;
    z-index: 2;
`;

const HeaderWrapper = styled.div`
    width: 100%;
    max-width: ${props => props.theme.maxWidth};
    display: flex;
    justify-content: center;
`;

const HeaderColumn = styled.div`
    width: 33%;
    text-align: center;
    &:first-child {
        margin-right: auto;
        text-align: left;
    }
    &:last-child {
        margin-left: auto;
        text-align: right;
    }
`;

// opacity:: component의 투명도를 정할 수 있음
const SearchInput = styled(Input)`
    background-color: ${props => props.theme.bgColor};
    padding: 5px;
    font-size: 14px;
    border-radius: 3px;
    height: auto;
    text-align: center;
    width: 70%;
    &:: placeholder {
        opacity: 0.8;
        font-weight: 200;
    }
`;

// &:not(:last-child) === 마지막 &를 제외한 나머지 & tag에 margin-right: 20px
const HeaderLink = styled(Link)`
    &:not(:last-child) {
        margin-right: 20px;
    }
`;

// Router에 접근하고 싶은데 가지고 있지 않으면, withRouter를 사용
// withRouter는 router가 할 수 있는 모든 것들에 access를 시켜줌
export default withRouter(({history}) => {
    const search = useInput("");
    const { data } = useQuery(ME);

    // event를 넣음
    const onSearchSubmit = (e) => {
        e.preventDefault();
        // useInput으로 hook한 것은 search를 주고, history.push는 onChange와 value를 준다는 것을 기억해야 함 
        // 여기선 value가 필요함
        history.push(`/search?term=${search.value}`);
    };
    return (    
    <Header>
        <HeaderWrapper>
            <HeaderColumn>
                <Link to="/">
                    <Logo />
                </Link>
            </HeaderColumn>
            <HeaderColumn>
                <form onSubmit={onSearchSubmit}>
                    <SearchInput value={search.value} onChange={search.onChange} placeholder="검색" />
                </form>
            </HeaderColumn>
            <HeaderColumn>
                <HeaderLink to="/">
                    <Home />
                </HeaderLink>
                <HeaderLink to="/message">
                    <Message />
                </HeaderLink>
                <HeaderLink to="/explore">
                    <Compass />
                </HeaderLink>
                <HeaderLink to="/notifications">
                    <HeartEmpty />
                </HeaderLink>
                {!(data !== undefined && data.me) ? (
                    <HeaderLink to="/#">
                        <User />
                    </HeaderLink>
                ) : (
                    <HeaderLink to={data.me.username}>
                        <User /> 
                    </HeaderLink>
                )}
            </HeaderColumn>
        </HeaderWrapper>
    </Header> 
    );
});