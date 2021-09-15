import { useMemo } from 'react'
import { ApolloClient, HttpLink, ApolloLink, InMemoryCache } from '@apollo/client'
// import { concatPagination } from '@apollo/client/utilities'
import merge from 'deepmerge'
// import isEqual from 'lodash/isEqual'
import Cookies from "universal-cookie"
import { setContext } from "@apollo/client/link/context"
import { onError } from "@apollo/client/link/error"
import { toast } from "react-toastify"

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

const TOKEN_STORAGE_KEY = process.env.NEXT_PUBLIC_TOKEN_STORAGE_KEY
let apolloClient

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
  console.log({ graphQLErrors, networkError })
  if (graphQLErrors)
    graphQLErrors.map(({ message, path }) => {
      console.log(`[GraphQL error]: Message: ${message} Path: ${path}`)
      message && toast.error(message, { hideProgressBar: true })
    })
  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
    networkError?.message &&
      toast.error(networkError.message, { hideProgressBar: true })
  }
})

const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'omit', // Additional fetch() options like `credentials` or `headers`
  })
  
  const authLink = setContext((_, { headers }) => {
    const cookies = new Cookies()
    const token = cookies.get(TOKEN_STORAGE_KEY)
    // return the headers to the context so httpLink can read them
    return {
      onError: (err) => console.log("ERRORS authlink"),
      headers: {
        ...headers,
        [TOKEN_STORAGE_KEY]: token ? token : "",
      },
    }
  })
  
  const createApolloClient = () => {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: ApolloLink.from([errorLink, authLink.concat(httpLink)]),
        cache: new InMemoryCache({
        //   typePolicies: {
        //     Query: {
        //       fields: {
        //         allPosts: concatPagination(),
        //       },
        //     },
        //   },
        }),
    })
  }
  
  export const initializeApollo = (initialState = null) => {
    // eslint-disable-next-line no-underscore-dangle
    const _apolloClient = apolloClient ?? createApolloClient()
  
    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    if (initialState) {
      // Get existing cache, loaded during client side data fetching
      const existingCache = _apolloClient.extract()
  
      // Merge the existing cache into data passed from getStaticProps/getServerSideProps
      const data = merge(initialState, existingCache)
  
      // Restore the cache using the data passed from getStaticProps/getServerSideProps
      // combined with the existing cached data
      _apolloClient.cache.restore(data)
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === "undefined") return _apolloClient
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient
  
    return _apolloClient
  }

  export const useApollo = (initialState) =>
  useMemo(() => initializeApollo(initialState), [initialState])