import { prisma } from "../../../../generated/prisma-client";

export default {
    Subscription: {
        newMessage: {
            subscribe: (_, args) => {
                // args로부터 chatId를 받아옴
                const { roomId } = args; 
                // prisma에서 subscribe할 수 있는 object 반환
                return prisma.$subscribe.message({AND: [
                    { mutation_in: "CREATED" },
                    { node: { room: { id: roomId } } }
                  ]}).node();
            },
            // resolver는 payload를 주는 함수
            resolve: payload => payload
        }
    }
}