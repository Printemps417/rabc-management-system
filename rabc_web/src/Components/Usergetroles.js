import React, { useState, useEffect, useContext } from 'react'
import { Form, Input, Select, Button, Mentions, message } from 'antd'
import { DataContext } from '../WelcomMenu'
import axios from 'axios'
const { Option } = Select

const Usergetroles = () => {
    const { userdata, roledata, authodata } = useContext(DataContext)
    const onFinish = (values) => {
        console.log('Received values:', values)
    }

    return (
        <Form name="userAddForm" onFinish={onFinish} labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
            <Form.Item name="id" label="用户名称" rules={[{ required: true }]}>
                <Mentions
                    style={{ width: '100%' }}
                    placeholder={userdata[0].userName}
                    readOnly
                />
            </Form.Item>
            <Form.Item name="nickname" label="用户昵称" >
                <Mentions
                    style={{ width: '100%' }}
                    placeholder={userdata[0].userNickname}
                    readOnly
                />
            </Form.Item>
            <Form.Item name="roles" label="用户角色" >
                <Select mode="multiple" placeholder="请选择用户状态">
                    {roledata.map((item, index) => {
                        return (
                            <Option value={item.roleId}>{item.roleName}</Option>
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
