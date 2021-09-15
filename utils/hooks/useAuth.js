import { useState } from "react"
import Router from "next/router"
import jwtDecode from "jwt-decode"
import Cookies from "universal-cookie"
import { useApolloClient } from "@apollo/client"
import { MUTATION_LOGIN_USER, QUERY_ME } from "../../graphql"

const TOKEN_STORAGE_KEY = process.env.NEXT_PUBLIC_TOKEN_STORAGE_KEY
const cookies = new Cookies()

export const useAuth = () => {
  const client = useApolloClient()
  const [loading, setLoading] = useState(false)

  const isAuth = () => {
    const token = cookies.get(TOKEN_STORAGE_KEY)
    if (!token) return false
    // decode token
    const decodedToken = jwtDecode(token)

    const isTokenExpired = isExpired(decodedToken)

    if (isTokenExpired) {
      // !isAuth
      cookies.remove(TOKEN_STORAGE_KEY)
      return false
    } else {
      // isAuth
      return true
    }
  }

  const expiresAt = (decodedToken) => {
    return new Date(decodedToken.exp * 1000)
  }

  const isExpired = (decodedToken) => {
    return new Date() > expiresAt(decodedToken)
  }

  const signIn = async (variables) => {
    setLoading(true)
    try {
      const { data } = await client.mutate({
        mutation: MUTATION_LOGIN_USER,
        variables,
      })
      cookies.set(TOKEN_STORAGE_KEY, `Bearer ${data?.login?.jwt || ""}`)

      const meData = await client.query({
        query: QUERY_ME,
        fetchPolicy: "no-cache",
      })
      if (meData) await Router.push("/")
    } catch {
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await client.clearStore()
      cookies.remove(TOKEN_STORAGE_KEY)
      await Router.push("/login")
    } catch {}
  }

  return {
    signIn,
    isAuth,
    expiresAt,
    isExpired,
    logout,
    loading,
  }
}