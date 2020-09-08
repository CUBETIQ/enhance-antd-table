import React, { useState, useRef, useEffect } from 'react'
// @ts-ignore
import EnhanceAntdTable, {
  newColumnsInterface,
  TableSkeleton
} from 'enhance-antd-table'
//@ts-ignore
import { Tag, Modal, Menu, Button } from 'antd'
//@ts-ignore
import { v4 as uuid } from 'uuid'
//@ts-ignore
import { DeleteOutlined } from '@ant-design/icons/lib'
import FormCreate from './FormCreate'
import 'enhance-antd-table/dist/index.css'

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
        {tags.map((tag: any, index: number) => {
          let color = tag.length > 5 ? 'geekblue' : 'green'
          if (tag === 'loser') {
            color = 'volcano'
          }
          return (
            <Tag color={color} key={index}>
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
  //@ts-ignore
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

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
          width: 1250,
          height: '100vh'
        }}
      >
        <TableSkeleton loading={loading}>
          <EnhanceAntdTable
            name={'exampleTable'}
            // columnsVisibleControllerProps={{
            //   show: true
            //   options: {
            //     trigger: () => <div>hello</div>
            //   }
            // }}
            // renderCreateButton={({ setDataSource }: any) => {
            //   setDataSourceRef.current = setDataSource
            //   return <Button onClick={() => setModal(true)}>Create</Button>
            // }}

            actionDelete={({ record, index }) => ({
              onClick: () => console.log('delete ', record, 'at ' + index)
            })}
            actionDetails={({ record, index }) => ({
              onClick: () => console.log(record, 'at ' + index)
            })}
            // renderOwnActionMenu={({ record, index }) => (
            //   <Menu>
            //     <Menu.Item
            //       key={uuid()}
            //       icon={<DeleteOutlined />}
            //       onClick={() => {
            //         console.log(record, index, 'hello')
            //       }}
            //     >
            //       Delete
            //     </Menu.Item>
            //   </Menu>
            // )}
            renderOwnSearchInput={({ setDataSource }) => (
              <Button
                onClick={() => {
                  setDataSource((old) => {
                    return old?.length == 0 ? data : []
                  })
                }}
              >
                Toggle
              </Button>
            )}
            newColumns={columns}
            newSources={data}
            restProps={{
              bordered: true,
              scroll: { x: 1550 },
              size: 'small',
              rowKey: 'id'
            }}
          />
        </TableSkeleton>
      </div>
    </div>
  )
}

export default App
