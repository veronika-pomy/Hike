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
        lng: Decimal!
        lat: Decimal!
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
        hike: Hike
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addHike(name: String!, lng: Decimal!, lat: Decimal!): Hike
        addSubscriberList(subscriberEmai: String!): subscriberList
        updateHike(_id: ID!, name: String!, lng: Decimal!, lat: Decimal!): Hike
        removeHike(name: String!): Hike
        removeSubscriberList(subscriberEmai: String!): subscriberList
    }
`;

module.exports = typeDefs;
