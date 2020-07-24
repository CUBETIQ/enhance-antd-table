import * as React from 'react'
import styles from './styles.module.css'
import { Tag, Space } from 'antd'
import 'antd/dist/antd.css'
import NewTable from './NewTable'
interface Props {
  text: string
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: any) => <a>{text}</a>
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags: any) => (
      <div>
        {tags.map((tag: any) => {
          let color = tag.length > 5 ? 'geekblue' : 'green'
          if (tag === 'loser') {
            color = 'volcano'
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          )
        })}
      </div>
    )
  },
  {
    title: 'Action',
    key: 'action',
    render: (record: any) => (
      <Space size='middle'>
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    )
  }
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
]

export const EnhanceAntdTable = ({ text }: Props) => {
  return (
    <div>
      <div className={styles.test}>
        Example Component: <b>{text}</b>
        <hr />
        <NewTable bordered={true} newColumns={columns} newSources={data} />
      </div>
    </div>
  )
}
