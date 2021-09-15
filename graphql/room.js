import gql from "graphql-tag"

export const QUERY_ROOMS = gql`
  query rooms {
    rooms {
      id
      name
      bookings {
        id
        room {
          id
        }
        time
      }
    }
  }
`