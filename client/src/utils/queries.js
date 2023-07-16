import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    {
        user {
            username
            email
            hike {
                _id
                name
                longitude
                latitude
            }
        }
    }
`;

export const QUERY_HIKE = gql`
    {
        hike {
            _id
            name
            longitude
            latitude
            hiker
        }
    }
`;