import { Button, Dropdown, Menu, Space } from 'antd'
import { DeleteOutlined, DownOutlined, ExpandOutlined } from '@ant-design/icons/lib'
import React from 'react'

const ActionMenu = () => {
  const menu = (
    <Menu>
      <Menu.Item key='1' icon={<ExpandOutlined />}>
        Detail
      </Menu.Item>
      <Menu.Item key='2' icon={<DeleteOutlined />}>
        Delete
      </Menu.Item>
    </Menu>
  )
  return (
    (
      <Space size='middle'>
        <Dropdown overlay={menu}>
          <Button>
            More <DownOutlined/>
          </Button>
        </Dropdown>
      </Space>
    )
  )
}


export default ActionMenu
