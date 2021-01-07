import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../../fragments";

export default {
    Mutation: {
        sendMessage: async(_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            // request로부터 user 받기
            const { user } = request;
            // args로부터 roomId, message, toId 받기
            const { roomId, message, toId } = args;
            let room; // 블록 유효 범위를 갖는 지역 변수 선언, 선언과 동시에 임의 값으로 초기화 가능
            if(roomId === undefined) {
                // roomId === undefined는 사용자에게 처음 메세지를 보낼 때를 의미함
                if(user.id !== toId) {
                    // user.id !== toId는 user.id가 toId와 같으면 room이 스스로에게 만들어지기 때문
                    room = await prisma.createRoom({
                        participants: {
                            connect: [
                                { id: toId }, // message를 받는 사람을 뜻함 (to)
                                { id: user.id } // message를 보내는 사람을 뜻함 (from)
                            ]
                        }
                    }).$fragment(ROOM_FRAGMENT);
                }
            } else {
                // room이 있기 때문에 room을 찾아야 함
                // 여기서 room 하나를 받음
                room = await prisma.room({ id: roomId }).$fragment(ROOM_FRAGMENT);
            }
            if(!room) {
                throw Error("Room is not Found");
            } 
            
            // getTo를 하는 이유는 room이 있을 경우 room의 toId를 모르기 때문에 알기 위해 filtering하는 것임
            const getTo = room.participants.filter(
                participant => participant.id !== user.id // 단 participant.id는 user.id가 아니여야함, 같은 사람이 아니여야 하기 때문
                )[0]; // element 하나만 return 하지 않게 하기 위함

            // Message 반환
            return prisma.createMessage({
                text: message, 
                from: {
                    connect: {
                        id: user.id
                    }
                },
                to: {
                    connect: {
                        id: roomId ? getTo.id : toId
                    }
                }, 
                room: {
                    connect: {
                        id: room.id // 방금 찾은 room의 id
                    }
                }
            });
            
            
        }
    }
}