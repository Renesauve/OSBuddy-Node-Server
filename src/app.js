const express = require("express");

const {ApolloServer, gql} = require("apollo-server-express");
const osBuddy = require("./datasources/osBuddy");
const resolvers = require("./resolvers");

const typeDefs = gql`
  type Query {
    items: [Item]
  }
  type Item {
    id: ID
    itemId: Int
    name: String
    members: Boolean
    sp: Int
    buyAverage: Int
    buyQuantity: Int
    sellAverage: Int
    sellQuantity: Int
    overallAverage: Int
    overallQuantity: Int
  }
`;

// Osbuddy api URLS
// `https://storage.googleapis.com/osb-exchange/summary.json`
// https://storage.googleapis.com/osb-exchange/item/6.json

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    osBuddy: new osBuddy(),
  }),
});

const app = express();
server.applyMiddleware({app});

app.listen({port: 4000}, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
