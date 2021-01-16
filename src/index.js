const { v4: uuidv4 } = require("uuid")
const { ApolloServer, gql, PubSub } = require("apollo-server")
const fs = require("fs")
const path = require("path")
const { PrismaClient } = require("@prisma/client")
const Subscription = require("./resolvers/Subscription")
const Query = require("./resolvers/Query")
const Mutation = require("./resolvers/Mutation")
const Link = require("./resolvers/Link")
const Vote = require("./resolvers/Vote")
const { getUserId } = require("./utils")

const prisma = new PrismaClient();
const pubsub = new PubSub();

const resolvers = {
    Query,
    Subscription,
    Mutation,
    Link,
    Vote
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
    resolvers,
    context: ({ req }) => ({
        ...req,
        prisma,
        pubsub,
        userId: req && req.headers.authorization ? getUserId(req) : null
    })
})

server.listen().then(({ url }) => console.log(`Server is running on ${url}`))