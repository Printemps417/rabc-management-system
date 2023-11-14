// 封装token存取操作
import axios from 'axios'
const key = 'ACCESS_TOKEN'

const setToken = (token) => {
    return window.localStorage.setItem(key, token)
}

const getToken = () => {
    return window.localStorage.getItem(key)
}
const checkToken = async () => {
    const headers = {
        'Authorization': 'Bearer ' + getToken()
    }

    try {
        const response = await axios.get("/api/users/profile/get", { headers })
        return Boolean(response.data.data) // Will return true if data exists, false otherwise.
    } catch (e) {
        console.error("读取token失败！", e)
        return false // Return false if an error occurs.
    }
}


const removeToken = () => {
    return window.localStorage.removeItem(key)
}

export {
    setToken,
    getToken,
    removeToken,
    checkToken
}