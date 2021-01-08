import { prisma } from "../../../generated/prisma-client";

export default {
    Comment: {
        // user
        user: ({ id }) => prisma.comment({ id }).user(),
        // post
        post: ({ id }) => prisma.comment({ id }).post()
    }
}