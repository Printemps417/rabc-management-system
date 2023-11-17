import React, { useContext } from 'react'
import { Form, Input, Switch, Button, message } from 'antd'
import { DataContext } from '../WelcomMenu'
import request from '../Tools/request'

const Rolesupdate = ({ record }) => {
    const { roledata, setRoledata } = useContext(DataContext)
    console.log(record)
    const onFinish = (values) => {
        try {
            // 构建请求体
            const requestBody = {
                key: values.key,
                roleId: values.roleId,
                roleName: values.roleName,
                roleType: values.roleType,
                roleIdentifier: values.roleIdentifier,
                displayOrder: values.displayOrder,
                remark: values.remark,
                status: values.status,
                createTime: values.createTime,
            }

            // 发送 PUT 请求
            request.put(`/roles/`, requestBody)
                .then((response) => {
                    message.success("角色更新成功")
                    // 在实际应用中，根据需要更新 roledata
                    // const updatedRoledata = roledata.map(role => (role.roleId === values.roleId ? requestBody : role))
                    // setRoledata(updatedRoledata)
                })
                .catch(() => {
                    message.error("角色更新失败")
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
                createTime: "2023-10-16", // 根据实际数据结构修改
            }}
        >
            {/* 根据 role 数据的结构，添加相应的 Form.Item */}
            <Form.Item label="Key" name="key">
                <Input placeholder={record.key} />
            </Form.Item>

            <Form.Item label="Role ID" name="roleId">
                <Input placeholder={record.roleId} />
            </Form.Item>

            <Form.Item label="Role Name" name="roleName" rules={[{ required: true, message: '请输入角色名称!' }]}>
                <Input placeholder={record.roleName} />
            </Form.Item>

            <Form.Item label="Role Type" name="roleType" rules={[{ required: true, message: '请输入角色类型!' }]}>
                <Input placeholder={record.roleType} />
            </Form.Item>

            <Form.Item label="Role Identifier" name="roleIdentifier" rules={[{ required: true, message: '请输入角色标识!' }]}>
                <Input placeholder={record.roleIdentifier} />
            </Form.Item>

            <Form.Item label="Display Order" name="displayOrder" rules={[{ required: true, message: '请输入显示顺序!' }]}>
                <Input type="number" placeholder={record.displayOrder} />
            </Form.Item>

            <Form.Item label="Remark" name="remark">
                <Input placeholder={record.remark} />
            </Form.Item>

            <Form.Item label="Status" name="status" valuePropName="checked">
                <Switch defaultChecked={record.status} />
            </Form.Item>

            <Form.Item label="Create Time" name="createTime">
                <Input disabled />
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

export default Rolesupdate
