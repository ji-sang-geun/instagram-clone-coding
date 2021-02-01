/* local state는 기본적으로 client에 없는 state */

// defaults에는 isLoggedIn이 token이 있는 지 확인 후 있으면 true, 없으면 false
export const defaults = {
    // 만약 localStorage.getItem("token")이 null이 아니면 true, 맞으면 false
    isLoggedIn: Boolean(localStorage.getItem("token")) || false
};

// resolvers에는 isLoggedIn을 true로 바꿀 function을 만들고, 그 이후 다시 false로 바꿈
export const resolvers = {
    Mutation: {
        // token과 cache를 가짐
        logUserIn: (_, {token}, {cache}) => {
            localStorage.setItem("token", token);
            cache.writeData({
                data:{
                    isLoggedIn: true
                }
            });
            return null;
        },
        // 오로지 cache만 가짐
        logUserOut: (_, __, {cache}) => {
            localStorage.removeItem("token");
            // 전체 페이지를 reload하는 것이 좋고 모든 cache를 없애길 원함
            window.location = "/";
            return null;
        }
    }
};