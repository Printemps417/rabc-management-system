import React, { useState, useEffect } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, message } from 'antd'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { getToken, setToken, checkToken } from '../Tools/token'

const Login = () => {
    const [redirect, setRedirect] = useState(false)
    const [flag, setFlag] = useState(false)
    const headers = {
        'Authorization': 'Bearer ' + getToken()
    }
    axios.get("http://localhost:8088/users/profile/get", { headers })
        .then((response) => {
            console.log(response.data.data)
            setFlag(Boolean(response.data.data))
        })
    if (flag) {
        message.success('您已登录！页面即将跳转')
        return <Navigate to='/welcome/user' replace={true} />
    }
    if (redirect) {
        return <Navigate to='/welcome/user' replace={true} />
    }
    const onFinish = async (values) => {
        try {
            axios.post('http://localhost:8088/users/login', {
                username: values.username,
                password: values.password,
            }).then(response => {
                if (response.data.data) {
                    console.log(response.data)
                    setToken(response.data.data.accessToken)
                    // Redirect to the welcome page
                    message.success("登录成功！页面即将跳转")
                    setRedirect(true)
                } else {
                    // If data is null, login failed
                    message.error('登录失败！账号密码错误')
                }
            })
        } catch (error) {
            // Handle any other errors
            message.error('登录过程中发生错误')
        }
    }

    const inputStyle = {
        width: '100%', // Set input width to 100%
        maxWidth: '300px', // Set maximum width for better readability
        margin: '0 auto', // Center the input horizontally
    }

    return (
        <>
            <h1 style={{
                marginLeft: "40%"
            }}>RABC管理系统</h1>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                style={{
                    marginLeft: "40%"
                }}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: '请输入您的用户名!' }]}
                >
                    <Input style={inputStyle} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入您的密码!' }]}
                >
                    <Input
                        style={inputStyle}
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="密码"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>记住我</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        忘记密码
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                    或者 <a href="">现在注册!</a>
                </Form.Item>
            </Form></>
    )
}

export default Login
