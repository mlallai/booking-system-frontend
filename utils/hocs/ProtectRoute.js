import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../hooks'
import { LoaderPage } from '../../components'

// import { Loader } from '../../../components'

export const ProtectRoute = ({ children }) => {
    const { isAuth } = useAuth()
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const login = '/login'


    useEffect(() => {
        const checkIsAuth = async () => {
            const auth = await isAuth()
            if (!auth) {
                redirectToLogin()
                setLoading(false)
            }
            else {
                setLoading(false)
            }
        }
        if (router.pathname !== "/login"){
            checkIsAuth()
        } else {
            setLoading(false)
        }
        // checkIsAuth()
    }, [])

    const redirectToLogin = async () => {
        router.push(login)
        setLoading(false)
    }

    if (loading) return <LoaderPage />
    return children
}