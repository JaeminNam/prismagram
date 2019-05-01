require("dotenv").config();
import {GraphQLServer} from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import {sendSecretMail} from "./utils";

console.log(process.env.PORT);

sendSecretMail("test@testmail.testtest","#secretKey");

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({schema});

server.express.use(logger("dev"));

server.start({port:PORT}, () => console.log(`Server running on port http://localhost:${PORT}`));