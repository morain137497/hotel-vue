const TOKEN_KEY = "token"
const PHONE_KEY = "phone"

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
    getPhone()
    {
        return sessionStorage.getItem(PHONE_KEY)
    },
    setPhone(phone)
    {
        sessionStorage.setItem(PHONE_KEY, phone)
    },
}
