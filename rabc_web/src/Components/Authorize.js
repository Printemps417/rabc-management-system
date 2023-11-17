import React, { useState, useEffect, useContext } from 'react'
import { Layout, Input, Button, Row, Col, Table, Switch, Modal, message } from 'antd'
import Authorizeadd from './Authorizeadd'
import axios from 'axios'
import { DataContext } from '../WelcomMenu'
import request from '../Tools/request'
import Authorizeupdate from './Authorizeupdate'
const { Header, Sider, Content } = Layout
const Authorize = () => {
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
    const handleDelete = (menuName) => {
        request.delete(`/permissions/${menuName}`)
            .then(() => {
                message.success("删除成功")

                // 在删除后更新userdata
                const updatedUMenudata = authodata.filter(autho => autho.menuName !== menuName)
                setAuthodata(updatedUMenudata)
            })
            .catch(() => {
                message.error("删除失败")
            })
    }
    const columns = [
        {
            title: '菜单名称',
            dataIndex: 'menuName',
            key: 'menuName',
        },
        {
            title: '图标',
            dataIndex: 'icon',
            key: 'icon',
        },
        {
            title: '排序权限标识',
            dataIndex: 'permission',
            key: 'permission',
        },
        {
            title: '组件路径',
            dataIndex: 'componentPath',
            key: 'componentPath',
        },
        {
            title: '组件名称',
            dataIndex: 'componentName',
            key: 'componentName',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (status) => <Switch defaultChecked={status} onChange={onChange} />,
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (text, record) => <>
                <a onClick={() => {
                    showModa3(record)
                }}>修改权限设置</a>
                <a style={{ color: "red" }} onClick={() => handleDelete(record.menuName)}> 删除</a>
            </>
        },
    ]
    return (
        <><Layout style={{ minHeight: '100vh' }}>
            <Content style={{ margin: '16px' }}>
                <div style={{ padding: '20px' }}>
                    <Row gutter={16} style={{ marginBottom: '20px' }}>
                        <Col span={6}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <p style={{ margin: 0, marginRight: '8px', whiteSpace: 'nowrap' }}>菜单名称：</p>
                                <Input placeholder="菜单名称" /></div>
                        </Col>
                        <Col span={6}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <p style={{ margin: 0, marginRight: '8px', whiteSpace: 'nowrap' }}>菜单状态：</p>
                                <Input placeholder="菜单状态" /></div>
                        </Col>
                        <Col span={12}>
                            <Button type="primary" style={{ marginRight: '10px' }}>
                                查找
                            </Button>
                            <Button type="default" style={{ marginRight: '10px' }}>
                                重置
                            </Button>
                            <Button type="primary" onClick={showModal} style={{ marginRight: '10px' }}>
                                新增
                            </Button>
                            <Modal title="增加权限" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                <Authorizeadd />
                            </Modal>
                            <Modal title="更新权限" open={isModalOpen3} onOk={handleOk3} onCancel={handleCancel3}>
                                <Authorizeupdate record={UpdateRecord} />
                            </Modal>
                            <Button type="default" style={{ marginRight: '10px' }}>
                                展开/折叠
                            </Button>
                            <Button type="default">刷新菜单缓存</Button>
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
                        <Table dataSource={authodata} columns={columns} style={{ width: '100%' }} />
                    </div>
                </div>
            </Content>
        </Layout></>
    )
}

export default Authorize
