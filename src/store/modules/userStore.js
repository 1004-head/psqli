import router from '@/router'

const userStore = {
    state: {
        token: ''
    },
    mutations: {
        login: function (state, payload) {
            state.token = payload.token
        },
        loginCheck: function (state) {
            if (!state.token) {
                router.push({
                    name: 'login'
                }).catch(error => {
                    console.log(error)
                })
            }
        }

    }
}

export default userStore