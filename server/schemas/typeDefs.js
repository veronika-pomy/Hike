const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String!
        email: String!
        hike: [Hike!]
    } 

    type Hike {
        _id: ID
        name: String!
        longitude: String!
        latitude: String!
        hiker: String
    }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        user: User
        hike: Hike
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addHike(name: String!, longitude: String!, latitude: String!, hiker: String): Hike
        updateHike(_id: ID!, name: String!, longitude: String!, latitude: String!): Hike
        removeHike(name: String!): Hike
    }
`;

module.exports = typeDefs;
