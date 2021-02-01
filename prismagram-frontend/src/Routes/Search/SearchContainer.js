import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { withRouter } from "react-router-dom";
import SearchPresenter from "./SearchPresenter";
import { SEARCH } from "./SearchQueries";

export default withRouter(({ location: { search }}) => {
    const term = search.split("=")[1];

    // Query는 term을 필요로 하는데, 없는 경우 Query는 기다리지 않고 자동으로 실행함 따라서, term이 없으므로 Query들이 잘못 되었다고 함 -> skip을 추가
    // query를 실행하고 싶지 않고, 누군가 여기에 뭔가 넣어주기를 기다릴 때 사용
    const { data, loading } = useQuery(SEARCH, {
        skip: term === undefined, // skip이 정의 되지 않았다면, query를 skip함
        variables: {
            term
        }
    });
    return (
        <SearchPresenter searchTerm={term} loading={loading} data={data} />
    );
});