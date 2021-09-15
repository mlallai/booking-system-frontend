import gql from "graphql-tag"

export const QUERY_TIMESLOTS = gql`
  query timeslots {
    timeslots {
      id
      startTime
    }
  }
`