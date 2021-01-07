import { prisma } from "../../../generated/prisma-client";

export default {
    Room: {
        // participants
        participants: ({ id }) => prisma.room({ id }).participants(),
        // messages
        messages: ({ id }) => prisma.room({ id }).messages()
    }
}