import React, { useState, useRef } from 'react'
// @ts-ignore
import EnhanceAntdTable, { newColumnsInterface } from 'enhance-antd-table'
//@ts-ignore
import { Tag, Modal, Menu, Button } from 'antd'
import { v4 as uuid } from 'uuid'
import { DeleteOutlined } from '@ant-design/icons/lib'
import FormCreate from './FormCreate'

<<<<<<< HEAD
=======
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 }
}
const tailLayout = {
  wrapperCol: { offset: 0, span: 20 }
}

const formProps = {
  layout,
  tailLayout
}

>>>>>>> origin/development
const App = () => {
  const [modal, setModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const setDataSourceRef = useRef<any>()
  const columns: Array<newColumnsInterface> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
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
    },
    {
      key: '4',
      name: 'LyhourChhen',
      age: 322,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher']
    }
  ]
  return (
    <div>
      <Modal
        okButtonProps={{ type: 'primary' }}
        okText={'Yes'}
        cancelText={'No'}
        centered={true}
        title={'Delete'}
        width={350}
        visible={openDeleteModal}
        onCancel={() => setOpenDeleteModal(false)}
      >
        <div style={{ alignItems: 'center' }}>
          <h3>Are you sure you want to delete this?</h3>
        </div>
      </Modal>
      <Modal
<<<<<<< HEAD
        visible={modal}
=======
        title='Create'
        visible={modal}
        footer={null}
>>>>>>> origin/development
        centered={true}
        onCancel={() => setModal(false)}
        onOk={() => setModal(false)}
      >
        <FormCreate
          {...formProps}
          onFinish={(value) => {
            setDataSourceRef.current((old: any[]) => {
              return [
                ...old,
                {
                  key: old.length + 1,
                  ...value
                }
              ]
            })
          }}
        />
      </Modal>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <EnhanceAntdTable
          renderCreateButton={({ setDataSource }) => {
            setDataSourceRef.current = setDataSource
            return <Button onClick={() => setModal(true)}>Create</Button>
          }}
          printButton={true}
          actionDelete={({ record, index }) => ({
            onClick: () => console.log('delete ', record, 'at ' + index)
          })}
          actionDetails={({ record, index }) => ({
            onClick: () => console.log(record, 'at ' + index)
          })}
          renderOwnActionMenu={({ record, index }) => (
            <Menu>
<<<<<<< HEAD
              <Menu.Item key={uuid()} icon={<DeleteOutlined />}>
=======
              <Menu.Item
                key={uuid()}
                icon={<DeleteOutlined />}
                onClick={() => {
                  console.log(record, index, 'hello')
                }}
              >
>>>>>>> origin/development
                Delete
              </Menu.Item>
            </Menu>
          )}
          bordered={true}
          newColumns={columns}
          newSources={data}
        />
      </div>
    </div>
  )
}

export default App
