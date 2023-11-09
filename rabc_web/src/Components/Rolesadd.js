import React from 'react'
import { Form, Input, Select, Button } from 'antd'

const { Option } = Select

const Rolesadd = () => {
    const onFinish = (values) => {
        console.log('Received values:', values)
    }

    return (
        <Form name="userAddForm" onFinish={onFinish} labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
            <Form.Item name="nickname" label="角色名称" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="phoneNumber" label="角色标识" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="userName" label="显示顺序" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="gender" label="角色状态" rules={[{ required: true }]}>
                <Select>
                    <Option value="male">男性</Option>
                    <Option value="female">女性</Option>
                    <Option value="other">其他</Option>
                </Select>
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

export default Rolesadd
