import React, { useState, useEffect, useContext } from 'react'
import { Form, Input, Select, Button, Mentions, message } from 'antd'
import { DataContext } from '../WelcomMenu'
import axios from 'axios'
import request from '../Tools/request'
const { Option } = Select

const Usergetroles = ({ record }) => {
    const { userdata, roledata, authodata, UserMessage, setUserdata, setRoledata, setAuthodata, setUserMessage } = useContext(DataContext)
    const onFinish = (values) => {
        console.log(record.userName, 'Received values:', values)
        try {
            // 构建请求体
            const requestBody = {
                username: record.userName,
                roleNames: values.roles
            }

            // 发送POST请求
            request.post('/allocate/roles', requestBody)
                .then((response) => {
                    message.success("增加成功")
                    // setUserdata([...userdata, requestBody])
                })
                .catch(() => {
                    message.error("增加失败")
                })
        } catch (error) {
            console.error('Error:', error)
            // 在这里可以添加一些错误处理逻辑
        }
    }

    return (
        <Form name="userAddForm" onFinish={onFinish} labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
            <Form.Item name="id" label="用户名称" >
                <Mentions
                    style={{ width: '100%' }}
                    placeholder={record.userName}
                    disabled
                />
            </Form.Item>
            <Form.Item name="nickname" label="用户昵称" >
                <Mentions
                    style={{ width: '100%' }}
                    placeholder={record.userNickname}
                    disabled
                />
            </Form.Item>
            <Form.Item name="roles" label="用户角色" >
                <Select mode="multiple" placeholder="请选择该用户的角色">
                    {roledata.map((item, index) => {
                        return (
                            <Option value={item.roleName}>{item.roleName}</Option>
                        )
                    })}
                </Select>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Usergetroles
