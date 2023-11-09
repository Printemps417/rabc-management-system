// src/reducers.js
import { GetUserData } from './actions'
import { useState } from 'react'

export const userReducer = (state = [], action) => {
    switch (action.type) {
        case "GetUserSuccess": {
            return action.payload
        }
        case "GetUserFail": {
            // 处理错误
            return state
        }
        default:
            return state
    }
}
// Role reducer
export const roleReducer = (state = [], action) => {
    switch (action.type) {
        case "GetRoleSuccess": {
            return action.payload
        }
        case "GetRoleFail": {
            // Handle error
            return state
        }
        default:
            return state
    }
}

// Permission reducer
export const permissionReducer = (state = [], action) => {
    switch (action.type) {
        case "GetPermissionSuccess": {
            return action.payload
        }
        case "GetPermissionFail": {
            // Handle error
            return state
        }
        default:
            return state
    }
}
