import React, { useEffect, useState, createContext } from 'react'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Layout, Menu, theme, message } from 'antd'
import { Link, Outlet, Navigate } from 'react-router-dom'
import { getToken, setToken, checkToken, removeToken } from './Tools/token'
import axios from 'axios'
export const DataContext = createContext()

const { Header, Content, Footer, Sider } = Layout
const WelcomMenu = () => {
    const [flag, setFlag] = useState(true)
    const [UserMessage, setUserMessage] = useState({})
    const [menuitems, setMenuitems] = useState(['系统管理', '基础设施', '支付管理'])
    const [nowlocation, setnowlocation] = useState(['系统管理', '用户管理'])
    const [userdata, setUserdata] = useState([])
    const [roledata, setRoledata] = useState([])
    const [authodata, setAuthodata] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8088/users/')
            .then((response) => {
                setUserdata(response.data)
            })
            .catch((error) => {
                message.error("读取数据失败")
            })
        axios.get('http://localhost:8088/roles/')
            .then((response) => {
                setRoledata(response.data)
            })
            .catch((error) => {
                message.error("读取数据失败")
            })
        axios.get('http://localhost:8088/permissions/')
            .then((response) => {
                setAuthodata(response.data)
            })
            .catch((error) => {
                message.error("读取数据失败")
            })
    }, [])

    // 刚打开网站时，向后端核验用户的token
    useEffect(() => {
        const headers = {
            'Authorization': 'Bearer ' + getToken()
        }

        axios.get("http://localhost:8088/users/profile/get", { headers })
            .then((response) => {
                console.log(response.data.data)
                setUserMessage(response.data.data)
                // setFlag(Boolean(response.data.data))
            })
            .catch(() => {
                setFlag(false)
                // 匹配失败时不能访问界面，返回登录界面
            })
    }, [])

    // 用户信息更新时，更新菜单信息
    useEffect(() => {
        const munuurl = "http://localhost:8088/allocate/getmenus/" + UserMessage.account
        console.log(munuurl)
        // 获取菜单项
        const fetchMenuItems = async () => {
            try {
                const response = await axios.get(munuurl)
                setMenuitems([...menuitems, ...response.data])
                console.log(menuitems)
                // ...其他逻辑
            } catch (error) {
                console.log("读取菜单失败")
            }
        }
        fetchMenuItems()
    }, [UserMessage])
    const {
        token: { colorBgContainer },
    } = theme.useToken()

    const items1 = ['用户管理', '角色管理', '权限管理']
    const linklist = ['/welcome/user', '/welcome/role', '/welcome/authorize']
    const itemList = [UserOutlined, LaptopOutlined, NotificationOutlined]
    const items2 = menuitems.map((menuitem, index) => {
        const key = String(index + 1)
        return {
            key: `sub${key}`,
            icon: React.createElement(itemList[index % 3]),
            label: menuitem,
            children: new Array(3).fill(null).map((_, j) => {
                const subKey = index * 3 + j + 1
                return {
                    key: subKey,
                    label: <Link
                        to={linklist[j]}
                        style={{
                            margin: 0
                        }}
                        onClick={() => {
                            const clickedItem = menuitem
                            const clickedSubItem = items1[j]
                            setnowlocation([clickedItem, clickedSubItem])
                        }}>
                        <p>{items1[j]}</p>
                    </Link>,

                }
            }),

        }
    })

    if (!flag) {
        message.error('您尚未登录！页面即将跳转')
        return <Navigate to='/login' replace={true} />
    }
    else {
        return (
            <DataContext.Provider value={{ userdata, roledata, authodata }}>
                <Layout
                    theme="dark">
                    <Header
                        style={{
                            display: 'flex',
                            alignItems: 'center',

                        }}
                        theme="light"
                    >
                        <div>"  "</div>
                        <p
                            style={{
                                color: "white",
                                fontSize: "24px"
                            }}

                        >RBAC后台管理系统</p>
                        <div>"  "</div>
                        <p
                            style={{
                                color: "white",
                                fontSize: "24px",
                            }}

                        >——2301210284 李昊彬</p>
                        <Button
                            type='primary'
                            style={{ display: 'right', justifyContent: 'flex-end', marginLeft: '60%' }}
                            onClick={() => {
                                removeToken()
                                message.success("退出登录成功")
                                setFlag(false)
                            }}
                        >退出登录</Button>
                    </Header>
                    <Content
                        style={{
                            padding: '0 50px',
                        }}
                    >

                        <Breadcrumb
                            style={{
                                margin: '16px 0',
                            }}
                        >
                            {nowlocation.map((item, index) => {
                                return <Breadcrumb.Item>{item}</Breadcrumb.Item>
                            })}
                        </Breadcrumb>
                        <Layout
                            style={{
                                padding: '24px 0',
                                background: colorBgContainer,
                            }}
                        >
                            <Sider
                                style={{
                                    background: colorBgContainer,
                                }}
                                width={200}

                            >
                                <Menu
                                    mode="inline"
                                    defaultSelectedKeys={['1']}
                                    defaultOpenKeys={['sub1']}
                                    style={{
                                        height: '100%',
                                    }}
                                    items={items2}
                                    theme='light'
                                />
                            </Sider>
                            <Content
                                style={{
                                    padding: '0 24px',
                                    minHeight: 280,
                                }}
                            >
                                <Outlet />
                            </Content>
                        </Layout>
                    </Content>
                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        hblee ©2023 互联网软件开发实践第五周作业
                    </Footer>
                </Layout>
            </DataContext.Provider>
        )
    }
}
export default WelcomMenu