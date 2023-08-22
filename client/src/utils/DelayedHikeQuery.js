import { useLazyQuery } from '@apollo/client';
import { QUERY_HIKE } from './queries';

//query hike data from server
function DelayedHikeQuery (_id) {
        const [ getHikes, { loading, data } ]= useLazyQuery(QUERY_HIKE, {
        variables: { _id }
        });
    };
  ;

  export default DelayedHikeQuery;