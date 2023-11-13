import React, { useState, useEffect } from 'react'
import { Layout, Input, Button, Row, Col, Table, Switch, Modal } from 'antd'
import Authorizeadd from './Authorizeadd'
import { useDispatch, useSelector } from 'react-redux'
import Rolesadd from './Rolesadd'
import { fetchPermissionData } from '../Redux/actions'
const { Header, Sider, Content } = Layout

const Authorize = () => {
    const [collapsed, setCollapsed] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const dispatch = useDispatch()
    const data = useSelector(state => state.authodata)

    useEffect(() => {
        dispatch(fetchPermissionData())
    }, [dispatch])


    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const onChange = (checked) => {
        console.log(`switch to ${checked}`)
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
            render: () =>
                <>
                    <a href="#" onClick={showModal}>修改</a>
                    <a href="#" onClick={showModal}>  新增</a>
                    <a href="#" style={{ color: "red" }}>  删除</a>
                </>,
        },
    ]
    return <p>Permission</p>
    // return (
    //     <><Layout style={{ minHeight: '100vh' }}>

    //         <Content style={{ margin: '16px' }}>
    //             <div style={{ padding: '20px' }}>
    //                 <Row gutter={16} style={{ marginBottom: '20px' }}>
    //                     <Col span={6}>
    //                         <div style={{ display: 'flex', alignItems: 'center' }}>
    //                             <p style={{ margin: 0, marginRight: '8px', whiteSpace: 'nowrap' }}>菜单名称：</p>
    //                             <Input placeholder="菜单名称" /></div>
    //                     </Col>
    //                     <Col span={6}>
    //                         <div style={{ display: 'flex', alignItems: 'center' }}>
    //                             <p style={{ margin: 0, marginRight: '8px', whiteSpace: 'nowrap' }}>菜单状态：</p>
    //                             <Input placeholder="菜单状态" /></div>
    //                     </Col>
    //                     <Col span={12}>
    //                         <Button type="primary" style={{ marginRight: '10px' }}>
    //                             查找
    //                         </Button>
    //                         <Button type="default" style={{ marginRight: '10px' }}>
    //                             重置
    //                         </Button>
    //                         <Button type="primary" onClick={showModal} style={{ marginRight: '10px' }}>
    //                             新增
    //                         </Button>
    //                         <Modal title="增加权限" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
    //                             <Authorizeadd />
    //                         </Modal>
    //                         <Button type="default" style={{ marginRight: '10px' }}>
    //                             展开/折叠
    //                         </Button>
    //                         <Button type="default">刷新菜单缓存</Button>
    //                     </Col>
    //                 </Row>
    //                 {/* 这里可以添加表格或其他搜索结果展示的组件 */}
    //             </div>
    //             <div style={{ display: 'flex' }}>
    //                 <div
    //                     style={{
    //                         backgroundColor: 'white',
    //                         marginLeft: '50px',
    //                         width: '100%',
    //                     }}
    //                 >
    //                     <Table dataSource={data} columns={columns} style={{ width: '100%' }} />
    //                 </div>
    //             </div>
    //         </Content>
    //     </Layout></>
    // )
}

export default Authorize
