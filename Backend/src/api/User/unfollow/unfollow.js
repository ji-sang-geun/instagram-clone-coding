import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares"

export default {
    Mutation: {
        // 이것은 인증을 받아야 하므로, request가 필요함
        unfollow: async(_, args, {request}) => {
            isAuthenticated(request);
            // args로부터 id 받기   
            const { id } = args;
            // request로부터 user 받기
            const { user } = request;
            // try - catch로 bool 형식 반환
            try {
                await prisma.updateUser({
                    // 요청하고 있는 사용자를 업데이트 하고 싶기 때문에, user.id를 받음
                    where: {id: user.id },
                    // 그 사용자를 업데이트 하는 것 = unfollowing
                    data: {
                        following: {
                            disconnect: {
                                id
                            }
                        }
                    }
                });
                return true;
            } catch {
                return false;
            }
        }
    }
}