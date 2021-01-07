/*
api 폴더 안 아주많은 graphql file 추가되는데, 
같은 위치에 resolvers file도 추가
따라서 그 파일들을 schema.js로 집어 넣음
*/

import path from "path"; // 파일의 경로
import { makeExecutableSchema } from "graphql-tools";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";

// 모든 graphql 파일
const allTypes = loadFilesSync(path.join(__dirname, "/api/**/*.graphql"));
// 모든 js 파일 - 단, api 폴더 밑 resolver가 아닌 .js를 두면 에러
const allResolvers = loadFilesSync(path.join(__dirname, "/api/**/*.js"));

const schema = makeExecutableSchema({
    typeDefs: mergeTypeDefs(allTypes),
    // 모든 resolver를 하나로 merging함
    resolvers: mergeResolvers(allResolvers),
});

export default schema;