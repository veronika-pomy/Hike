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
        route: [Route!]
    }

    type Route {
        _id: ID!
        routeName: String!
        origin: String!
        destination: String!
        hikeName: String
        index: String
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
        addRoute(routeName: String!, origin: String!, destination: String!): Route
        addSubscriberList(subscriberEmail: String!): subscriberList
        updateHike(_id: ID!, name: String!): Hike
        updateRoute(_id: ID!, routeName: String!): Route
        removeHike(name: String!): Hike
        removeRoute(routeName: String!): Route
        removeSubscriberList(subscriberEmail: String!): subscriberList
    }
`;

module.exports = typeDefs;
