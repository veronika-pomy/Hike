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
        longitude: Int!
        latitude: Int!
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
        addHike(name: String!, longitude: Int!, latitude: Int!): Hike
        updateHike(_id: ID!, name: String!, longitude: Int!, latitude: Int!): Hike
        removeHike(name: String!): Hike
    }
`;

// TODO: Update user

module.exports = typeDefs;
