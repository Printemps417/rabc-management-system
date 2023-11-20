import React, { useState, useEffect, useContext } from 'react'
import { Form, Input, Select, Button, message } from 'antd'
import { Checkbox, Divider } from 'antd'
import { Mentions } from 'antd'
import axios from 'axios'
import { DataContext } from '../WelcomMenu'
import request from '../Tools/request'
const CheckboxGroup = Checkbox.Group

const { Option } = Select

const Rolesgetauthorize = ({ record }) => {

    const { userdata, roledata, authodata, UserMessage, setUserdata, setRoledata, setAuthodata, setUserMessage } = useContext(DataContext)
    const [checkedList, setCheckedList] = useState([])

    const onFinish = (values) => {
        console.log(record.roleName, 'Received values:', values)
        try {
            // 构建请求体
            const requestBody = {
                roleName: record.roleName,
                permissionNames: values.permissions

            }

            // 发送POST请求
            request.post('/allocate/permissions', requestBody)
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

    const onCheckAllChange = (e) => {
        setCheckedList(e.target.checked ? authodata.map(item => item.menuName) : [])
    }

    const onChange = (list) => {
        setCheckedList(list)
    }
    return (
        <Form name="userAddForm" onFinish={onFinish} labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
            <Form.Item name="id" label={"角色名称"} >
                <Mentions
                    style={{ width: '100%' }}
                    placeholder={record.roleId}
                    disabled
                />
            </Form.Item>
            <Form.Item name="rolename" label={"角色标识:"} >
                <Mentions
                    style={{ width: '100%' }}
                    placeholder={record.roleType}
                    disabled
                />
            </Form.Item>
            <Form.Item name="permissions" label="权限列表" >
                <Select mode="multiple" placeholder="请选择该用户的角色">
                    {authodata.map((item, index) => {
                        return (
                            <Option value={item.menuName}>{item.menuName}</Option>
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

export default Rolesgetauthorize
