import React, { useState, useEffect, useContext } from 'react'
import { Breadcrumb, Layout, Menu, theme, Modal } from 'antd'
import { DatePicker, Input, Button, Row, Col, message } from 'antd'
import { Table, Switch } from 'antd'
import Rolesadd from './Rolesadd'
import Rolesgetauthorize from './Rolesgetauthorize'
import axios from 'axios'
import { DataContext } from '../WelcomMenu'
import request from '../Tools/request'
import Rolesupdate from './Rolesupdate'
const { RangePicker } = DatePicker
const { Header, Sider, Content } = Layout
const Role = () => {
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
    const showModal2 = () => {
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
    const handleDelete = (roleId) => {
        request.delete(`/roles/${roleId}`)
            .then(() => {
                message.success("删除成功")

                // 在删除后更新userdata
                const updatedroleIddata = roledata.filter(role => role.roleId !== roleId)
                setRoledata(updatedroleIddata)
            })
            .catch(() => {
                message.error("删除失败")
            })
    }
    const columns = [
        {
            title: '角色编号',
            dataIndex: 'roleId',
            key: 'roleId',
        },
        {
            title: '角色名称',
            dataIndex: 'roleName',
            key: 'roleName',
        },
        {
            title: '角色类型',
            dataIndex: 'roleType',
            key: 'roleType',
        },
        {
            title: '角色标识',
            dataIndex: 'roleIdentifier',
            key: 'roleIdentifier',
        },
        {
            title: '显示顺序',
            dataIndex: 'displayOrder',
            key: 'displayOrder',
        },
        {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (status) => <Switch defaultChecked={status} onChange={onChange} />,
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
            render: (text, record) =>
                <>
                    <a onClick={() => {
                        showModa3(record)
                    }}>编辑</a>
                    <a onClick={showModal2} > 菜单权限</a>
                    <a > 数据权限</a>
                    <a style={{ color: "red" }} onClick={() => handleDelete(record.roleId)}>  删除</a>
                </>,
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
    return (
        <><Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Content style={{ margin: '16px' }}>
                <div style={{ padding: '20px' }}>
                    <Row gutter={16} style={{ marginBottom: '20px' }}>

                        <Col span={8}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <p style={{ margin: 0, marginRight: '8px', whiteSpace: 'nowrap' }}>角色名称</p>
                                <Input placeholder="角色名称" />
                            </div>
                        </Col>
                        <Col span={8}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <p style={{ margin: 0, marginRight: '8px', whiteSpace: 'nowrap' }}>角色标识：</p>
                                <Input placeholder="角色标识" />
                            </div>
                        </Col>
                        <Col span={6}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <p style={{ margin: 0, marginRight: '8px', whiteSpace: 'nowrap' }}>角色状态：</p>
                                <Input placeholder="角色状态" />
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
                            <Modal title="增加角色" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                <Rolesadd />
                            </Modal>
                            <Modal title="分配权限" open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2}>
                                <Rolesgetauthorize />
                            </Modal>
                            <Modal title="更新角色" open={isModalOpen3} onOk={handleOk3} onCancel={handleCancel3}>
                                <Rolesupdate record={UpdateRecord} />
                            </Modal>
                            <Button type="primary" style={{ backgroundColor: 'rgba(82, 196, 26, 0.2)', color: '#52c41a', borderColor: '#52c41a' }}>导出</Button>
                        </Col>
                    </Row>
                    {/* 这里可以添加表格或其他搜索结果展示的组件 */}
                </div>
                <div style={{ display: 'flex' }}>
                    <div
                        style={{
                            backgroundColor: 'white',
                            marginLeft: '50px',
                            width: '100%',
                        }}
                    >
                        <Table dataSource={roledata} columns={columns} style={{ width: '100%' }} />
                    </div>
                </div>
            </Content>
        </Layout></>
    )
}
export default Role