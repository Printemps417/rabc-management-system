import React, { useState, useEffect, useContext } from 'react'
import { Form, Input, Select, Button, message } from 'antd'
import { Checkbox, Divider } from 'antd'
import { Mentions } from 'antd'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { DataContext } from '../WelcomMenu'

const CheckboxGroup = Checkbox.Group

const { Option } = Select

const Rolesgetauthorize = () => {

    const dispatch = useDispatch()
    const { userdata, roledata, authodata } = useContext(DataContext)
    const [checkedList, setCheckedList] = useState([])

    const onFinish = (values) => {
        console.log('Received values:', values)
    }

    const onCheckAllChange = (e) => {
        setCheckedList(e.target.checked ? authodata.map(item => item.menuName) : [])
    }

    const onChange = (list) => {
        setCheckedList(list)
    }
    return (
        <Form name="userAddForm" onFinish={onFinish} labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
            <Form.Item name="id" label={"角色名称"} rules={[{ required: true }]}>
                <Mentions
                    style={{ width: '100%' }}
                    placeholder={roledata[0].roleId}
                    readOnly
                />
            </Form.Item>
            <Form.Item name="nickname" label={"角色标识:"} >
                <Mentions
                    style={{ width: '100%' }}
                    placeholder={roledata[0].roleType}
                    readOnly
                />
            </Form.Item>
            <Form.Item name="roles" label="用户角色" >
                <Checkbox onChange={onCheckAllChange} checked={checkedList.length === authodata.length}>
                    全选
                </Checkbox>
                <Divider />
                <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                    {authodata.map(item => (
                        <div><Checkbox
                            key={item.menuName}
                            value={item.menuName}
                            checked={checkedList.includes(item.menuName)}
                            onChange={() => onChange([...checkedList, item.menuName])}
                        >
                            {item.menuName}
                        </Checkbox></div>
                    ))}
                </div>
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
