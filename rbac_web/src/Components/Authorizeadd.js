import React, { useState } from 'react'
import { Form, Input, Select, Button, Radio, Slider } from 'antd'
const { Option } = Select

const Authorizeadd = () => {

    const onFinish = (values) => {
        console.log('Received values:', values)
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
            <Form.Item name="gender" label="上级菜单" rules={[{ required: true }]}>
                <Select>
                    <Option value="male">男性</Option>
                    <Option value="female">女性</Option>
                    <Option value="other">其他</Option>
                </Select>
            </Form.Item>
            <Form.Item name="menuname" label="菜单名称" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="address" label="路由地址" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item name="order" label="显示顺序" rules={[{ required: true, type: 'integer', min: 0, max: 100 }]}>
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
            <Form.Item name="isshow" label="显示状态" rules={[{ required: true }]}>
                <Radio.Group >
                    <Radio.Button value="large">显示</Radio.Button>
                    <Radio.Button value="middle">隐藏</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item name="alwaysshow" label="总是显示" rules={[{ required: true }]}>
                <Radio.Group >
                    <Radio.Button value="always">总是</Radio.Button>
                    <Radio.Button value="notalways">不是</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Authorizeadd
