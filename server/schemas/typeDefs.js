const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String!
        email: String!
        hike: [Hike!]
    } 

    type Hike {
        _id: ID!
        name: String!
        lng: Float!
        lat: Float!
        hiker: String
    }

    type subscriberList {
        _id: ID
        subscriberEmail: String!
    }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        user: User
        hike (_id: ID!): Hike
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addHike(name: String!, lng: Float!, lat: Float!): Hike
        addSubscriberList(subscriberEmail: String!): subscriberList
        updateHike(_id: ID!, name: String!): Hike
        removeHike(name: String!): Hike
        removeSubscriberList(subscriberEmail: String!): subscriberList
    }
`;

module.exports = typeDefs;
