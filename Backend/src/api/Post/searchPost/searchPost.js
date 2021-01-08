import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        // 검색하는 데는, request와 같이, 사용자 인증 과정이 필요하지 않기 때문에 request를 인자에 안 넣어줌
        searchPost: async(_, args) => prisma.posts({where: {
            OR: [
                {location_starts_with: args.term},
                {caption_starts_with: args.term}
            ]
        }})
    }
}