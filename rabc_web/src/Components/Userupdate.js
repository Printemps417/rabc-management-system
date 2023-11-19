import React, { useContext, useState } from 'react'
import { Form, Input, Select, Button, Switch, message } from 'antd'
import { DataContext } from '../WelcomMenu'
import request from '../Tools/request'
const { Option } = Select

const Userupdate = ({ record }) => {
    const { userdata, roledata, authodata, UserMessage, setUserdata, setRoledata, setAuthodata, setUserMessage } = useContext(DataContext)
    console.log("正在更新，record:")
    console.log(record)

    const onFinish = (values) => {

        try {
            // 构建请求体
            const requestBody = {
                key: record.key,
                userId: record.userId,
                userName: values.userName,
                userNickname: values.userNickname,
                department: values.department,
                phoneNumber: values.phoneNumber,
                status: values.status,
                createTime: record.createTime,
                account: UserMessage
            }

            // 发送POST请求
            request.put('/users/', requestBody)
                .then((response) => {
                    message.success("更新成功")
                    // const updatedUserdata = userdata.filter(user => user.userId !== values.userId)
                    // setUserdata(updatedUserdata)
                    // setUserdata([...userdata, requestBody])
                })
                .catch(() => {
                    message.error("更新失败")
                })
        } catch (error) {
            console.error('Error:', error)
            // 在这里可以添加一些错误处理逻辑
        }
    }

    return (
        <Form
            name="yourForm"
            onFinish={onFinish}
            initialValues={{
                // key: record.key,
                // userId: record.userId,
                createTime: "2023-10-30T12:00:00Z",
                account: record.account
            }}
        >
            <Form.Item label="Key" name="key">
                <Input placeholder={record.key} disabled />
            </Form.Item>

            <Form.Item label="User ID" name="userId">
                <Input placeholder={record.userId} disabled />
            </Form.Item>

            <Form.Item label="User Name" name="userName" rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input placeholder={record.userName} />
            </Form.Item>

            <Form.Item label="Nickname" name="userNickname" rules={[{ required: true, message: 'Please input your nickname!' }]}>
                <Input placeholder={record.userNickname} />
            </Form.Item>

            <Form.Item label="Department" name="department" rules={[{ required: true, message: 'Please input your department!' }]}>
                <Input placeholder={record.department} />
            </Form.Item>

            <Form.Item label="Phone Number" name="phoneNumber" rules={[{ required: true, message: 'Please input your phone number!' }]}>
                <Input placeholder={record.phoneNumber} />
            </Form.Item>

            <Form.Item label="Status" name="status" valuePropName="checked">
                <Switch />
            </Form.Item>

            <Form.Item label="Create Time" name="createTime">
                <Input placeholder={record.createTime} disabled />
            </Form.Item>

            <Form.Item label="Account" name={['account', 'placeholder']}>
                <Input placeholder={UserMessage} disabled />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit"
                    style={{
                        width: "100%"
                    }}
                    onClick={onFinish}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Userupdate
