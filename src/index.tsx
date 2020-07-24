import 'antd/dist/antd.css'
import { Button, Dropdown, Menu, Space, Table } from 'antd'
import { TableProps, ColumnProps } from 'antd/es/table'
import React from 'react'
import { DownOutlined, UserOutlined } from '@ant-design/icons/lib'

interface enhanceTableInterface<IRowData = any> extends TableProps<IRowData> {
  newColumns?: Array<newColumnsInterface>
  newSources?: Array<any>
}

export interface newColumnsInterface<T = any> extends ColumnProps<T> {
}

const EnhanceAntdTable: React.FC<enhanceTableInterface> = (props) => {
  const menu = (
    <Menu>
      <Menu.Item key='1' icon={<UserOutlined/>}>
        1st menu item
      </Menu.Item>
      <Menu.Item key='2' icon={<UserOutlined/>}>
        2nd menu item
      </Menu.Item>
      <Menu.Item key='3' icon={<UserOutlined/>}>
        3rd item
      </Menu.Item>
    </Menu>
  )

  const defaultColumns: Array<newColumnsInterface> = [
    ...(props.newColumns || []),
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size='middle'>

          <Dropdown overlay={menu}>
            <Button>
              Button <DownOutlined/>
            </Button>
          </Dropdown>
        </Space>
      )
    }
  ]
  return (
    <div>
      <Table
        bordered={props.bordered}
        dataSource={props.newSources}
        columns={defaultColumns}
      />
    </div>
  )
}

EnhanceAntdTable.defaultProps = {
  bordered: true
}

export default EnhanceAntdTable
