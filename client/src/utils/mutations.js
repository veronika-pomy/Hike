import { gql } from '@apollo/client';

export const LOG_IN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser(
        $username: String!
        $email: String!
        $password: String!
    ) {
        addUser(
            username: $username
            email: $email
            password: $password
        ) {
            token
            user {
                _id
            }
        }
    }
`;

export const ADD_HIKE = gql`
    mutation addHike(
        $name: String!
        $lng: Float!
        $lat: Float!
    ) {
        addHike(
            name: $name
            lng: $lng
            lat: $lat
        ) {
            _id
            name
            lng
            lat
        }
    }
`;

export const ADD_ROUTE = gql`
    mutation addRoute(
        $routeName: String!
        $origin: String!
        $destination: String!
        $hikeName: String!
        $index: String
    ) {
        addRoute(
            routeName: $routeName
            origin: $origin
            destination: $destination
            hikeName: $hikeName
            index: $index
        ) {
            _id
            routeName
            origin
            destination
            hikeName
        }
    }
`;

export const ADD_SUBSCRIBER_LIST = gql`
    mutation addSubscriberList(
        $subscriberEmail: String!
    ) {
        addSubscriberList(
            subscriberEmail: $subscriberEmail
        ) {
            _id
            subscriberEmail
        }
    }
`;

export const UPDATE_HIKE = gql`
    mutation updateHike(
        $_id: ID!
        $name: String!
    ) {
        updateHike(
            _id: $_id
            name: $name
        )
        {
            name
        }
    }
`;

export const UPDATE_HIKE_ROUTE_LIST = gql`
    mutation updateHikeRouteList(
        $_id: ID!
        $index: String
    ) {
        updateHikeRouteList(
            _id: $_id
            index: $index
        )
        {
            _id
        }
    }
`;

export const UPDATE_ROUTE = gql`
    mutation updateRoute(
        $_id: ID!
        $routeName: String!
    ) {
        updateRoute(
            _id: $_id
            routeName: $routeName
        )
        {
            routeName
        }
    }
`;

export const REMOVE_HIKE = gql`
    mutation removeHike($name: String!) {
        removeHike(name: $name) {
            name
            lng
            lat
            hiker
        }
    }
`;

export const REMOVE_ROUTE = gql`
    mutation removeRoute($routeName: String!) {
        removeRoute(routeName: $routeName) {
            _id
            routeName
            origin
            destination
            hikeName
        }
    }
`;

export const REMOVE_SUBSCRIBER_LIST = gql`
    mutation removeSubscriberList($subscriberEmail: String!) {
        removeSubscriberList(subscriberEmail: $subscriberEmail) {
            subscriberEmail
        }
    }
`;