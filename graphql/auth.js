import gql from "graphql-tag"

export const MUTATION_LOGIN_USER = gql`
  mutation login($identifier: String!, $password: String!) {
  login(input: { identifier: $identifier,
    password: $password }) {
    jwt
  }
}
`

export const QUERY_ME = gql`
  query me {
    me {
      id
      email
      username
    }
  }
`
