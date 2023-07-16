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
        $longitude: String!
        $latitude: String!
    ) {
        addHike(
            name: $name
            longitude: $longitude
            latitude: $latitude
        ) {
            _id
            name
            longitude
            latitude
        }
    }
`;

export const UPDATE_HIKE = gql`
    mutation updateHike(
        $_id: ID!
        $name: String!
        $longitude: String!
        $latitude: String!
    ) {
        updateHike(
            where: {_id: {_eq: $_id}},
            _set: {
                name: $name
                longitude: $longitude
                latitude: $latitude
            }
        )
        {
            affected_rows
            returning {
                _id
                name
                longitude
                latitude
            }
        }
    }
`;

export const REMOVE_HIKE = gql`
    mutation removeHike($name: String) {
        removeHike(name: $name) {
            name
            longitude
            latitude
            hiker
        }
    }
`;