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
                route {
                    _id
                    routeName
                    origin
                    destination
                }
            }
        }
    }
`;