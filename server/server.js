const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
// TODO: add authmiddleware import

require('dotenv').config();

// TODO: add typeDef and resolvers from shemas

const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
};

// TOD): before building on heroku catch all for all server-side get routes to route to index file in build directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// TODO: a new instance of an Apollo server with the GraphQL schema

// TODO: start the server