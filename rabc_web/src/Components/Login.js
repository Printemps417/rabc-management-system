import React, { useState, useEffect } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, message, notification } from 'antd'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { getAccessToken, setAccessToken, getRefreshToken, setRefreshToken } from '../Tools/token'
import service from '../Tools/request'

const Login = () => {
    const [redirect, setRedirect] = useState(false)

    service.get("/users/profile/get")
        .then((response) => {
            console.log("用户名为：" + response.data.data)
            if (Boolean(response.data.data)) {
                message.success("您已登录！页面即将跳转")
            }
        })
    if (redirect) {
        return <Navigate to='/welcome/user' replace={true} />
    }
    const onFinish = async (values) => {
        await service.post('/users/login', {
            username: values.username,
            password: values.password,
        }).then(response => {
            if (response.data.data) {
                console.log(response.data)
                setAccessToken(response.data.data.accessToken)
                setRefreshToken(response.data.data.refreshToken)
                // Redirect to the welcome page
                message.success("登录成功！页面即将跳转")
                setRedirect(true)
            } else {
                // If data is null, login failed
                message.error('登录失败！账号密码错误')
            }
        })
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
