import gql from "graphql-tag"

export const QUERY_COMPANIES = gql`
  query companies {
    companies {
      id
      name
    }
  }
`