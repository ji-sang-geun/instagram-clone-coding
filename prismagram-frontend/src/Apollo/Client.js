import ApolloClient from "apollo-boost";
import { defaults, resolvers } from "./LocalState";

// graphql 없이 localhost:4000만 써야 함
// 이것이 apollo Client
export default new ApolloClient({
    uri: "http://localhost:4000",
    clientState: {
        defaults,
        resolvers
    },
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
});

/* 
    우리가 하길 원하는 건 Apollo Provider과 Apollo Client를 만드는 것 
    defaults(Type Definition)와 resolvers는 지금 우리가 가지고 있지 않아서 만들어야 함
*/
