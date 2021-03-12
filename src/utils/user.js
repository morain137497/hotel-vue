const TOKEN_KEY = "token"
const USER_ID_KEY = "userId"

export default {
    getToken()
    {
        return sessionStorage.getItem(TOKEN_KEY)
    },
    setToken(token)
    {
        sessionStorage.setItem(TOKEN_KEY, token)
    },
    removeToken()
    {
        sessionStorage.removeItem(TOKEN_KEY)
    },
    getUserId()
    {
        return sessionStorage.getItem(USER_ID_KEY)
    },
    setUserId(userId)
    {
        sessionStorage.setItem(USER_ID_KEY, userId)
    },
}
