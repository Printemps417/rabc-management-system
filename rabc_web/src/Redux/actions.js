// src/actions.js
import axios from 'axios'
// action creators
const getUserSuccess = (userData) => {
    return {
        type: "GetUserSuccess",
        payload: userData,
    }
}

const getUserFail = (error) => {
    return {
        type: "GetUserFail",
        payload: error,
    }
}
// Role action creators
const getRoleSuccess = (roleData) => {
    return {
        type: "GetRoleSuccess",
        payload: roleData,
    }
}

const getRoleFail = (error) => {
    return {
        type: "GetRoleFail",
        payload: error,
    }
}

// Permission action creators
const getPermissionSuccess = (permissionData) => {
    return {
        type: "GetPermissionSuccess",
        payload: permissionData,
    }
}

const getPermissionFail = (error) => {
    return {
        type: "GetPermissionFail",
        payload: error,
    }
}

// 异步的 action creator
export const fetchUserData = () => {
    return (dispatch) => {
        axios.get('http://localhost:8088/users/')
            .then((response) => {
                dispatch(getUserSuccess(response.data))
            })
            .catch((error) => {
                dispatch(getUserFail(error))
            })
    }
}
// Asynchronous action creator for roles
export const fetchRoleData = () => {
    return (dispatch) => {
        axios.get('http://localhost:8088/roles/')
            .then((response) => {
                dispatch(getRoleSuccess(response.data))
            })
            .catch((error) => {
                dispatch(getRoleFail(error))
            })
    }
}

// Asynchronous action creator for permissions
export const fetchPermissionData = () => {
    return (dispatch) => {
        axios.get('http://localhost:8088/permissions/')
            .then((response) => {
                dispatch(getPermissionSuccess(response.data))
            })
            .catch((error) => {
                dispatch(getPermissionFail(error))
            })
    }
}
