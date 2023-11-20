import React, { useEffect, useState, useContext } from 'react'
import { Breadcrumb, Layout, Menu, theme, Modal, message } from 'antd'
import { DatePicker, Input, Button, Row, Col } from 'antd'
import { Table, Switch } from 'antd'
import Useradd from './Useradd'
import Userupdate from './Userupdate'
import Usergetroles from './Usergetroles'
import axios from 'axios'
import { DataContext } from '../WelcomMenu'
import request from '../Tools/request'
const { RangePicker } = DatePicker
const { Header, Content, Footer, Sider } = Layout


const User = () => {
    const [UpdateRecord, setUpdateRecord] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalOpen2, setIsModalOpen2] = useState(false)
    const [isModalOpen3, setIsModalOpen3] = useState(false)

    const { userdata, roledata, authodata, UserMessage, setUserdata, setRoledata, setAuthodata, setUserMessage } = useContext(DataContext)
    // const userdata = []

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }
    const showModa2 = (record) => {
        setUpdateRecord(record)
        setIsModalOpen2(true)
    }

    const handleOk2 = () => {
        setIsModalOpen2(false)
    }

    const handleCancel2 = () => {
        setIsModalOpen2(false)
    }
    const showModa3 = (record) => {
        setUpdateRecord(record)
        setIsModalOpen3(true)
    }

    const handleOk3 = () => {
        setIsModalOpen3(false)
    }

    const handleCancel3 = () => {
        setIsModalOpen3(false)
    }

    const onChange = (checked) => {
        console.log(`switch to ${checked}`)
    }
    // 修改删除操作的函数
    const handleDelete = (userId) => {
        request.delete(`/users/${userId}`)
            .then(() => {
                message.success("删除成功")

                // 在删除后更新userdata
                const updatedUserdata = userdata.filter(user => user.userId !== userId)
                setUserdata(updatedUserdata)
            })
            .catch(() => {
                message.error("删除失败")
            })
    }

    const columns = [
        {
            title: '用户编号',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: '用户名称',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: '用户昵称',
            dataIndex: 'userNickname',
            key: 'userNickname',
        },
        {
            title: '部门',
            dataIndex: 'department',
            key: 'department',
        },
        {
            title: '手机号码',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (status) => <Switch defaultChecked={status} onChange={onChange} />
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (text, record) => <>
                <a onClick={() => {
                    showModa3(record)
                }}>修改</a>
                <a onClick={() => {
                    showModa2(record)
                }}> 分配角色</a>
                <a style={{ color: "red" }} onClick={() => handleDelete(record.userId)}> 删除</a>
            </>
        },
    ]

    function getItem (label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        }
    }
    const items = [
        getItem('Navigation One', 'sub1', null, [
            getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
            getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
        ]),
        getItem('Navigation Two', 'sub2', null, [
            getItem('Option 5', '5'),
            getItem('Option 6', '6'),
            getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
        ]),
        {
            type: 'divider',
        },
        getItem('Navigation Three', 'sub4', null, [
            getItem('Option 9', '9'),
            getItem('Option 10', '10'),
            getItem('Option 11', '11'),
            getItem('Option 12', '12'),
        ]),
        getItem('Group', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
    ]
    return (
        <>
            <Layout
                style={{
                    minHeight: '100vh',
                }}
            >
                <Content style={{ margin: '16px' }}>
                    <div style={{ padding: '20px' }}>
                        <Row gutter={16} style={{ marginBottom: '20px' }}>
                            <Col span={8}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <p style={{ margin: 0, marginRight: '8px', whiteSpace: 'nowrap' }}>用户名：</p>
                                    <Input placeholder="用户名" />
                                </div>
                            </Col>
                            <Col span={8}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <p style={{ margin: 0, marginRight: '8px', whiteSpace: 'nowrap' }}>手机号：</p>
                                    <Input placeholder="手机号码" />
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <p style={{ margin: 0, marginRight: '8px', whiteSpace: 'nowrap' }}>用户状态：</p>
                                    <Input placeholder="用户状态" />
                                </div>
                            </Col>
                        </Row>

                        <Row gutter={16} style={{ marginBottom: '20px' }}>
                            <Col span={16}>
                                <RangePicker style={{ width: '100%' }} />
                            </Col>
                            <Col span={8}>
                                <Button type="primary" style={{ marginRight: '10px' }}>查找</Button>
                                <Button type="default" style={{ marginRight: '10px' }}>重置</Button>
                                <Button type="primary" onClick={showModal} style={{ backgroundColor: 'rgba(24, 144, 255, 0.2)', marginRight: '10px', color: '#1890ff', borderColor: '#1890ff' }}>新增</Button>
                                <Modal title="增加用户" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                    <Useradd />
                                </Modal>
                                <Modal title="分配角色" open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2}>
                                    <Usergetroles record={UpdateRecord} />
                                </Modal>
                                <Modal title="更新用户信息" open={isModalOpen3} onOk={handleOk3} onCancel={handleCancel3}>
                                    <Userupdate record={UpdateRecord}></Userupdate>
                                </Modal>
                                <Button type="primary" style={{ backgroundColor: 'rgba(255, 165, 0, 0.2)', marginRight: '10px', color: 'rgba(255, 165, 0, 1)', borderColor: 'rgba(255, 165, 0, 1)' }}>导入</Button>
                                <Button type="primary" style={{ backgroundColor: 'rgba(82, 196, 26, 0.2)', color: '#52c41a', borderColor: '#52c41a' }}>导出</Button>
                            </Col>
                        </Row>
                        {/* 这里可以添加表格或其他搜索结果展示的组件 */}
                    </div>
                    <div style={{ display: 'flex' }}>
                        <Menu
                            theme="light"
                            defaultSelectedKeys={['1']}
                            mode="inline"
                            items={items}
                            style={{
                                width: "200px",
                                marginLeft: "30px",
                                marginRight: "30px"
                            }}
                        />
                        <div style={{ display: 'flex' }}>
                            <div
                                style={{
                                    backgroundColor: 'white',
                                    marginLeft: '50px',
                                    width: '100%',
                                }}
                            >
                                <Table dataSource={userdata} columns={columns} style={{ width: '100%' }} />
                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
        </>
    )
}
export default User