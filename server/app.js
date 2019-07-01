const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const config = require('./config');

const app = express();

mongoose.connect(
  `mongodb+srv://sayaka:${
    config.mongoPass
  }@cluster0-k5u2y.mongodb.net/gql?retryWrites=true&w=majority`,
  { useNewUrlParser: true }
);
mongoose.connection.once('open', () => {
  console.log('connected to database');
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log('now listening for request on port 4000');
});
