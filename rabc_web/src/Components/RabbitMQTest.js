import React, { useState, useEffect } from 'react'
import { Button, List, Card, Col, Row, Layout, Table } from 'antd'
import axios from 'axios'
import request from '../Tools/request'
const { Header, Sider, Content } = Layout
const RabbitMQTest = () => {
    const [courses, setCourses] = useState([])

    useEffect(() => {
        const fetchCourses = () => {
            request.get('/lessons')
                .then((res) => {
                    // console.log(res)
                    setCourses(res.data)
                })
                .catch((error) => {
                    // 处理错误
                    console.error('Error fetching courses:', error)
                })
        }
        fetchCourses()
    }, [])

    const enrollCourse = (record) => {
        const requestBody = {
            id: record.id,
            name: record.name,
            teacher: record.teacher,
            time: record.time,
            choosennum: record.choosennum,
            maxnum: record.maxnum
        }
        console.log(record)
        request.post("/lessons/choose", requestBody)
            .then((res) => {
                console.log(res.data)
            })
            .catch((error) => {
                // 处理错误
                console.error('Error fetching courses:', error)
            })

    }

    const columns = [
        {
            title: '课程名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '课程编号',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '任课老师',
            dataIndex: 'teacher',
            key: 'teacher',
        },
        {
            title: '上课时间',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: '已选人数',
            dataIndex: 'choosennum',
            key: 'choosennum',
            render: (text, record) => `${text}/${record.maxnum}`
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Button
                    type="primary"
                    onClick={() => enrollCourse(record)}
                >
                    选课
                </Button>
            ),
        },
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
                        <Table dataSource={courses} columns={columns} rowKey="id" />
                    </div>
                </Content>
            </Layout>
        </>

    )
}
export default RabbitMQTest
