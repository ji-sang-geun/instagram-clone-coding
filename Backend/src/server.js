// ./env를 passport와 utils에 dotenv를 불러오지 않고 process.env를 사용 가능
import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import "./passport";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";


const PORT = process.env.PORT || 4000;

// typedef와 resolver를 따로 입력하던지, 하나로 합친 schema를 입력하던지 선택
// 편의와 확장성을 위해 하나로 합친 schema 사용
// context = resolver 사이에서 정보를 공유할 때 사용
const server = new GraphQLServer({ 
    schema, 
    context: ({request}) => ({request, isAuthenticated })
});

server.express.use(logger("dev"));
server.express.use(authenticateJwt);

server.start({ port : PORT }, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);