import React, { useContext } from 'react'
import { Form, Input, Button, Switch, message } from 'antd'
import { DataContext } from '../WelcomMenu'
import request from '../Tools/request'

const Authorizeupdate = ({ record }) => {
    // 假设 DataContext 包含了相关的状态和函数
    const { authodata, setAuthodata } = useContext(DataContext)
    console.log(record)
    const onFinish = (values) => {
        try {
            // 构建请求体
            const requestBody = {
                key: values.key,
                menuName: values.menuName,
                icon: values.icon,
                permission: values.permission,
                componentPath: values.componentPath,
                componentName: values.componentName,
                status: values.status,
            }

            // 发送 PUT 请求
            request.put(`/permissions/`, requestBody)
                .then((response) => {
                    message.success("权限更新成功")
                    // 更新 authodata，根据实际需要修改
                    const updatedAuthodata = authodata.map(auth => (auth.key === values.key ? requestBody : auth))
                    setAuthodata(updatedAuthodata)
                })
                .catch(() => {
                    message.error("权限更新失败")
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
        >
            <Form.Item label="Key" name="key">
                <Input disabled placeholder={record.key} />
            </Form.Item>

            <Form.Item label="Menu Name" name="menuName" rules={[{ required: true, message: '请输入菜单名称!' }]}>
                <Input placeholder={record.menuName} />
            </Form.Item>

            <Form.Item label="Icon" name="icon" rules={[{ required: true, message: '请输入图标!' }]}>
                <Input placeholder={record.icon} />
            </Form.Item>

            <Form.Item label="Permission" name="permission" rules={[{ required: true, message: '请输入权限!' }]}>
                <Input placeholder={record.permission} />
            </Form.Item>

            <Form.Item label="Component Path" name="componentPath" rules={[{ required: true, message: '请输入组件路径!' }]}>
                <Input placeholder={record.componentPath} />
            </Form.Item>

            <Form.Item label="Component Name" name="componentName" rules={[{ required: true, message: '请输入组件名称!' }]}>
                <Input placeholder={record.componentName} />
            </Form.Item>

            <Form.Item label="Status" name="status" valuePropName="checked">
                <Switch defaultChecked={record.status} />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit"
                    style={{
                        width: "100%"
                    }}
                    onClick={onFinish}>
                    提交
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Authorizeupdate
