import React, { useState, useContext } from 'react'
import { Form, Input, Select, Button, Radio, Slider, message, Switch } from 'antd'
import { DataContext } from '../WelcomMenu'
import request from '../Tools/request'

const { Option } = Select

const Authorizeadd = () => {

    // 假设 DataContext 包含了相关的状态和函数
    const { authodata, setAuthodata } = useContext(DataContext)

    const onFinish = (values) => {
        console.log("正在提交")
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

            // 发送 POST 请求
            request.post('/permissions/', requestBody)
                .then((response) => {
                    message.success("权限添加成功")
                    // 更新 authodata，根据实际需要修改
                    setAuthodata([...authodata, requestBody])
                })
                .catch(() => {
                    message.error("权限添加失败")
                })
        } catch (error) {
            console.error('Error:', error)
            // 在这里可以添加一些错误处理逻辑
        }
    }
    const [value, setValue] = useState(1)
    const onChange = (e) => {
        console.log('radio checked', e.target.value)
        setValue(e.target.value)
    }
    const [sliderValue, setSliderValue] = useState(0)

    const onSliderChange = (value) => {
        setSliderValue(value)
    }

    return (
        <Form name="userAddForm" onFinish={onFinish} labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
            <Form.Item label="Key" name="key">
                <Input />
            </Form.Item>

            <Form.Item label="Menu Name" name="menuName" rules={[{ required: true, message: '请输入菜单名称!' }]}>
                <Input />
            </Form.Item>

            <Form.Item label="Icon" name="icon" rules={[{ required: true, message: '请输入图标!' }]}>
                <Input />
            </Form.Item>

            <Form.Item label="Permission" name="permission" rules={[{ required: true, message: '请输入权限!' }]}>
                <Input />
            </Form.Item>

            <Form.Item label="Component Path" name="componentPath" rules={[{ required: true, message: '请输入组件路径!' }]}>
                <Input />
            </Form.Item>

            <Form.Item label="Component Name" name="componentName" rules={[{ required: true, message: '请输入组件名称!' }]}>
                <Input />
            </Form.Item>

            <Form.Item label="Status" name="status" valuePropName="checked">
                <Switch />
            </Form.Item>
            <Form.Item name="order" label="显示顺序" rules={[{ type: 'integer', min: 0, max: 100 }]}>
                <Input value={sliderValue} />
                <Slider
                    value={typeof sliderValue === 'number' ? sliderValue : 0}
                    onChange={onSliderChange}
                    min={0}
                    max={100}
                    step={1}
                />
            </Form.Item>
            <Form.Item name="type" label="菜单类型" rules={[{ required: true }]}>
                <Radio.Group >
                    <Radio.Button value="menu1">目录</Radio.Button>
                    <Radio.Button value="menu2">菜单</Radio.Button>
                    <Radio.Button value="menu3">按钮</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item name="condition" label="菜单状态" rules={[{ required: true }]}>
                <Radio.Group onChange={onChange} value={value}>
                    <Radio value={1}>开启</Radio>
                    <Radio value={2}>关闭</Radio>
                </Radio.Group>
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

export default Authorizeadd
