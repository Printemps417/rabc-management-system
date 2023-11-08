import React from 'react'
import { Form, Input, Select, Button } from 'antd'

const { Option } = Select

const Useradd = () => {
    const onFinish = (values) => {
        console.log('Received values:', values)
    }

    return (
        <Form name="userAddForm" onFinish={onFinish} labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
            <Form.Item name="nickname" label="用户昵称" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="phoneNumber" label="手机号码" rules={[{ required: true, pattern: /^[1-9]\d{10}$/ }]}>
                <Input />
            </Form.Item>
            <Form.Item name="userName" label="用户名称" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="gender" label="用户性别" rules={[{ required: true }]}>
                <Select>
                    <Option value="male">男性</Option>
                    <Option value="female">女性</Option>
                    <Option value="other">其他</Option>
                </Select>
            </Form.Item>

            <Form.Item name="department" label="归属部门">
                <Input />
            </Form.Item>
            <Form.Item name="email" label="邮箱" rules={[{ required: true, type: 'email' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="password" label="用户密码" rules={[{ required: true }]}>
                <Input.Password />
            </Form.Item>
            <Form.Item name="position" label="岗位">
                <Input />
            </Form.Item>
            <Form.Item name="note" label="备注">
                <Input.TextArea />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Useradd
