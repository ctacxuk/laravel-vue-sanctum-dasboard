import {reactive, watch} from 'vue'
import {useApi} from "./api";
import router from "../router";
import {useAuthState, User} from "./authState";


const AUTH_KEY = process.env.MIX_AUTH_KEY!

const {authenticating, user, error} = useAuthState()


const token = localStorage.getItem(AUTH_KEY)

if ( token ) {
    const { loading, data, get } = useApi('/api/user')
    authenticating.value = true

    get({})

    watch([ loading ], () => {
        if ( data.value ) {
            // user = data.value
            authenticating.value = true
        }
    })
}
export const useTest = () => {
    const test = '123'
    return {
        test
    }
}

export const useAuth = () => {

    const setUser = (payload: User, remember: boolean): void => {
        // user = payload
        if ( remember ) {
            localStorage.setItem(AUTH_KEY, 'yes')
        }
        authenticating.value = true
        router.push("/dashboard");
        // error.value = undefined

    }

    const { post:postLogout } = useApi('/api/logout')
    const logout = () => {
        postLogout().then(() => {
            localStorage.removeItem(AUTH_KEY)
            authenticating.value = false
            router.push("/user/login");
        })
    }


    return {
        setUser,
        logout
    }

}
