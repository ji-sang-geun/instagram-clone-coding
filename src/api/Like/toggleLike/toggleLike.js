/* 여기서는 toggleLike를 가지는데, args, {request}가 동기화됨 
이것이 인증을 요구하는 resolver가 됨
*/

import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares"

export default {
    Mutation: {
        toggleLike: async (_,args, {request}) => {
            if(request.user) {
                // contex로부터 request를 넘겨줌.
                isAuthenticated(request);
                // 여기에 argument와 resolver가 함께 있어야 함.
                const { postId } = args;
                // 여기서 user를 얻을 수 있는데, user가 없으면 function이 멈추고 만다
                const { user } = request;

                const filterOptions = {
                    AND: [
                        {
                            user: {
                                id: user.id
                            }
                        },
                        {
                            post: {
                                id: postId
                            }
                        }
                    ]
                }
                try {
                // existence를 확인해야 하는데, Prisma Client를 얻어야 함
                // 편집하거나 삭제 할 수 없음
                const existingLike = await prisma.$exists.like(filterOptions);

                // 삭제
                if(existingLike) await prisma.deleteManyLikes(filterOptions);
                
                else {
                    // 좋아요는, postId와 user에 관한 것임
                    await prisma.createLike({
                        user: {
                            connect: {
                                id: user.id 
                            }
                        },
                        post: {
                            connect: {
                                id: postId
                            }
                        }
                    });
                }
                return true;
                } catch {
                    return false;
                }
            }
        }
    }
}