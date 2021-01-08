import { prisma } from "../../../generated/prisma-client";

export default {
    Message: {
        // from
        from: ({ id }) => prisma.message({ id }).from(),
        // to
        to: ({ id }) => prisma.message({ id }).to(),
        // room
        room: ({ id }) => prisma.message({ id }).room()

    }
};