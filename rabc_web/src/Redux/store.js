// src/store.js
import { configureStore } from '@reduxjs/toolkit'
import { userReducer, roleReducer, permissionReducer } from './reducers'

const store = configureStore({
    reducer: {
        userdata: userReducer,
        roledata: roleReducer,
        authodata: permissionReducer
    }
})

export default store
