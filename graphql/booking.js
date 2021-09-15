import gql from "graphql-tag"

export const QUERY_BOOKINGS = gql`
  query bookings {
    bookings {
      id
      time
      room {
          name
      }
    }
  }
`
export const MUTATION_DELETE_BOOKING = gql`
  mutation deleteBooking($id: ID!) {
    deleteBooking(input: { where : { id: $id } }){
      booking {
        id
      }
    }
}
`

export const MUTATION_CREATE_BOOKING = gql`
  mutation createBooking($room: ID, $time: Time) {
    createBooking(input: { data : { room: $room, time: $time } }){
      booking {
        id
        time
        room {
          id
          name
        }
      }
    }
}
`