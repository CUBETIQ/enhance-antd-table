import React, { useState } from 'react'
// @ts-ignore
import EnhanceAntdTable, { newColumnsInterface } from 'enhance-antd-table'
//@ts-ignore
import { Tag, Modal, Menu } from 'antd'
import { v4 as uuid } from 'uuid'
import { DeleteOutlined } from '@ant-design/icons/lib'

const App = () => {
  const [modal, setModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
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
        visible={modal}
        centered={true}
        onCancel={() => setModal(false)}
        onOk={() => setModal(false)}
      >
        <h1>hi</h1>
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
          createButtonProps={{
            onClick: () => setModal(true)
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
              <Menu.Item
                key={uuid()}
                icon={<DeleteOutlined />}
                onClick={() => {
                  console.log(record, index, 'hello')
                }}
              >
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
