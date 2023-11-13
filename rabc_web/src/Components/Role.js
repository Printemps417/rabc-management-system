import React, { useState, useEffect } from 'react'
import { Breadcrumb, Layout, Menu, theme, Modal } from 'antd'
import { DatePicker, Input, Button, Row, Col } from 'antd'
import { Table, Switch } from 'antd'
import Rolesadd from './Rolesadd'
import Rolesgetauthorize from './Rolesgetauthorize'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRoleData } from '../Redux/actions'
const { RangePicker } = DatePicker

const Role = () => {
    const [collapsed, setCollapsed] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalOpen2, setIsModalOpen2] = useState(false)
    const dispatch = useDispatch()
    const data = useSelector(state => state.roledata)

    useEffect(() => {
        dispatch(fetchRoleData())
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
    const showModal2 = () => {
        console.log("2done")
        setIsModalOpen2(true)
    }

    const handleOk2 = () => {
        setIsModalOpen2(false)
    }

    const handleCancel2 = () => {
        setIsModalOpen2(false)
    }
    const {
        token: { colorBgContainer },
    } = theme.useToken()
    const onChange = (checked) => {
        console.log(`switch to ${checked}`)
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
            render: () =>
                <>
                    <a href="#">编辑</a>
                    <a href="#" onClick={showModal2} > 菜单权限</a>
                    <a href="#"> 数据权限</a>
                    <a href="#" style={{ color: "red" }}>  删除</a>
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
    return <p>Role</p>
    // return (
    //     <><Layout
    //         style={{
    //             minHeight: '100vh',
    //         }}
    //     >
    //         <div style={{ padding: '20px' }}>
    //             <Row gutter={16} style={{ marginBottom: '20px' }}>

    //                 <Col span={8}>
    //                     <div style={{ display: 'flex', alignItems: 'center' }}>
    //                         <p style={{ margin: 0, marginRight: '8px', whiteSpace: 'nowrap' }}>角色名称</p>
    //                         <Input placeholder="角色名称" />
    //                     </div>
    //                 </Col>
    //                 <Col span={8}>
    //                     <div style={{ display: 'flex', alignItems: 'center' }}>
    //                         <p style={{ margin: 0, marginRight: '8px', whiteSpace: 'nowrap' }}>角色标识：</p>
    //                         <Input placeholder="角色标识" />
    //                     </div>
    //                 </Col>
    //                 <Col span={6}>
    //                     <div style={{ display: 'flex', alignItems: 'center' }}>
    //                         <p style={{ margin: 0, marginRight: '8px', whiteSpace: 'nowrap' }}>角色状态：</p>
    //                         <Input placeholder="角色状态" />
    //                     </div>
    //                 </Col>
    //             </Row>
    //             <Row gutter={16} style={{ marginBottom: '20px' }}>
    //                 <Col span={16}>
    //                     <RangePicker style={{ width: '100%' }} />
    //                 </Col>
    //                 <Col span={8}>
    //                     <Button type="primary" style={{ marginRight: '10px' }}>查找</Button>
    //                     <Button type="default" style={{ marginRight: '10px' }}>重置</Button>
    //                     <Button type="primary" onClick={showModal} style={{ backgroundColor: 'rgba(24, 144, 255, 0.2)', marginRight: '10px', color: '#1890ff', borderColor: '#1890ff' }}>新增</Button>
    //                     <Modal title="增加角色" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
    //                         <Rolesadd />
    //                     </Modal>
    //                     <Modal title="分配权限" open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2}>
    //                         <Rolesgetauthorize />
    //                     </Modal>
    //                     <Button type="primary" style={{ backgroundColor: 'rgba(82, 196, 26, 0.2)', color: '#52c41a', borderColor: '#52c41a' }}>导出</Button>
    //                 </Col>
    //             </Row>
    //             {/* 这里可以添加表格或其他搜索结果展示的组件 */}
    //         </div>
    //         <div style={{ display: 'flex' }}>
    //             <div
    //                 style={{
    //                     backgroundColor: "white",
    //                     marginLeft: "50px",
    //                     width: "100%"
    //                 }}
    //             ><Table dataSource={data} columns={columns}
    //                 style={{
    //                     width: "100%"
    //                 }}
    //                 />;
    //             </div>
    //         </div>

    //     </Layout></>
    // )
}
export default Role