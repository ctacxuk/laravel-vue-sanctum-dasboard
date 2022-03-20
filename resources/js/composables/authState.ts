import {reactive, toRefs} from 'vue'


export interface User {
    id: string;
    email: string;
}

interface AuthState {
    authenticating: boolean;
    user?: User;
    error?: Error;
}

const state = reactive<AuthState>({
    authenticating: false,
    user: undefined,
    error: undefined,
})


export const useAuthState = () => {
    return {
        ...toRefs(state),
    }

}
