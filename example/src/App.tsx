import React, { useState, useRef } from 'react'
// @ts-ignore
import EnhanceAntdTable, { newColumnsInterface } from 'enhance-antd-table'
//@ts-ignore
import { Tag, Modal, Menu, Button } from 'antd'
import { v4 as uuid } from 'uuid'
import { DeleteOutlined } from '@ant-design/icons/lib'
import FormCreate from './FormCreate'

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

const dummy = [
  {
    name: 'លីហួរ',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  },
  {
    name: 'LyhourChhen',
    age: 322,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
]

let data: any[] = []

for (let i = 0; i < 4; i++) {
  data.push(...dummy)
}

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

const App = () => {
  const [modal, setModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const setDataSourceRef = useRef<any>()

  return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
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
        title='Create'
        visible={modal}
        footer={null}
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
          width: 1250
        }}
      >
        <EnhanceAntdTable
          name={'exampleTable'}
          withColumnsVisibleController={true}
          renderCreateButton={({ setDataSource }: any) => {
            setDataSourceRef.current = setDataSource
            return <Button onClick={() => setModal(true)}>Create</Button>
          }}
          printProps={{
            generateColumnHeaders: (columns, avaiableFonts) => {
              return columns.map((item) => ({
                text: item.title,
                fontSize: 20,
                font: avaiableFonts.kh
              }))
            },
            generateColumnWidths: (columns) => {
              return columns.map((item) =>
                item.dataIndex === 'name' ? 50 : '*'
              )
            },
            generateTableBody: (visibleData: any, avaiableFonts) => {
              const newRecords = visibleData.map(
                (record: { [index: string]: any }) => {
                  let newRow: any[] = []
                  for (let key in record) {
                    newRow.push({
                      text: record[key],
                      fontSize: 20,
                      font: avaiableFonts.kh
                    })
                  }

                  return newRow
                }
              )

              return newRecords
            }
          }}
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
          newColumns={columns}
          newSources={data}
          restProps={{
            bordered: true,
            scroll: { x: 1550, y: 400 },
            size: 'small'
          }}
        />
      </div>
    </div>
  )
}

export default App
