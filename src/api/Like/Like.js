import { prisma } from "../../../generated/prisma-client";

export default {
    Like: {
        // user
        user: ({ id }) => prisma.like({ id }).user(),
        // post
        post: ({ id }) => prisma.like({ id }).post()
    }
}