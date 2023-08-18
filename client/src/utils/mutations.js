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
        $name: String!
    ) {
        updateHike(
            name: $name
        )
        {
            name
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

export const REMOVE_SUBSCRIBER_LIST = gql`
    mutation removeSubscriberList($subscriberEmail: String!) {
        removeSubscriberList(subscriberEmail: $subscriberEmail) {
            subscriberEmail
        }
    }
`;