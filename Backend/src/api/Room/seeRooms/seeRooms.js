import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeRooms: (_, __, {request, isAuthenticated}) => {
            isAuthenticated(request);
            // request로부터 user 받기
            const { user } = request;

            // room들 반환
            return prisma.rooms({where: {
                participants_some: {
                    id: user.id
                }
            }});
        }
    }
}