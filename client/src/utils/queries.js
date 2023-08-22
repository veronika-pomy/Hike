import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    {
        user {
            username
            email
            hike {
                _id
                name
                lng
                lat
            }
        }
    }
`;

export const QUERY_HIKE = gql`
    query getHike($_id: ID!) {
        hike (_id: $_id) {
            _id
            name
        }
    }
`;

// export const QUERY_HIKE = gql`
//     {
//         hike ($id: ID!) {
//             _id
//             name
//             lng
//             lat
//             hiker
//         }
//     }
// `;