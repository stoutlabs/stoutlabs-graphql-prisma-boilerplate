/* ------------------------------------------------------------------------------------
Note: This MUCH cleaner version works with everything except subscriptions... ugh.
If subscriptions are ever added to apollo-boost, I will switch back to this.
// -----------------------------------------------------------------------------------*/
import ApolloBoost from "apollo-boost";

const getClient = (jwt) => {
  return new ApolloBoost({
    uri: 'http://0.0.0.0:8000',
    request(operation) {
      if (jwt) {
        operation.setContext({
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        })
      }
    }
  });
}

export { getClient as default }