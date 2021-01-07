/* middleware는 api 밖에 있어야 함 */

export const isAuthenticated = (request) => {
    if(!request.user) { // request.user를 갖지 않으면
        throw Error("You need to log in to perform this action"); // 에러를 출력
    }
    return; 
}