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
        $lng: Decimal!
        $lat: Decimal!
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

export const UPDATE_HIKE = gql`
    mutation updateHike(
        $_id: ID!
        $name: String!
        $lng: Decimal!
        $lat: Decimal!
    ) {
        updateHike(
            where: {_id: {_eq: $_id}},
            _set: {
                name: $name
                lng: $lng
                lat: $lat
            }
        )
        {
            affected_rows
            returning {
                _id
                name
                lng
                lat
            }
        }
    }
`;

export const REMOVE_HIKE = gql`
    mutation removeHike($name: String) {
        removeHike(name: $name) {
            name
            lng
            lat
            hiker
        }
    }
`;