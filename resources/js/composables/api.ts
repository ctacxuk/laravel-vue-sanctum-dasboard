import axios, { AxiosRequestConfig } from 'axios'
import { ref } from 'vue'
import {useAuthState} from "./authState";
import router from "../router";

const AUTH_KEY = process.env.MIX_AUTH_KEY!

export const useApi = (endpoint: string) => {


    const api = axios.create({

    })

    const data = ref()
    const loading = ref(false)
    const error = ref()


    const {authenticating} = useAuthState()



    const post = (payload?: Record<string, any>) => {
        loading.value = true
        error.value = undefined
        return api.post(endpoint, payload)
            .then(res => {
                data.value = res.data
            })
            .catch(e => {
                error.value = e.response
                if (error.value.status === 401 || error.value.status === 419){
                    authenticating.value = false
                    localStorage.removeItem(AUTH_KEY)
                    router.push("/user/login");
                }
            })
            .finally(() => loading.value = false)
    }


    const get = (query?: Record<string, any>, config?: AxiosRequestConfig) => {
        loading.value = true
        error.value = undefined

        let queryString = ''

        if ( query ) {
            queryString = '?' + Object.entries(query)
                .map(([ key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                .join('&')
        }

        return api.get(endpoint + queryString, config)
            .then(res => {
                data.value = res.data
            })
            .catch(e => {
                error.value = e.response
                if (error.value.status === 401 || error.value.status === 419){
                    authenticating.value = false
                    localStorage.removeItem(AUTH_KEY)
                    router.push("/user/login");
                }
            })
            .finally(() => loading.value = false)
    }


    return {
        post,
        get,
        data,
        loading,
        error
    }

}
