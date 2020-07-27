import { Button, Dropdown, Menu, Space } from 'antd'
import { DeleteOutlined, DownOutlined, ExpandOutlined } from '@ant-design/icons/lib'
import { MenuProps } from 'antd/es/menu'
import React from 'react'

export interface actionMenuPropsInterface extends MenuProps {
}

interface ActionMenuInterface {
  delete?: any,
  detail?: any,
}

const ActionMenu: React.FC<ActionMenuInterface> = (props) => {

  const menu = (
    <Menu>
      <Menu.Item key='1' icon={<ExpandOutlined/>} {...props.detail}>
        Detail
      </Menu.Item>
      <Menu.Item key='2' icon={<DeleteOutlined/>} {...props.delete}>
        Delete
      </Menu.Item>
    </Menu>
  )
  return (
    <div>
      <div>
      </div>
      <Space size='middle'>
        <Dropdown overlay={menu}>
          <Button>
            More <DownOutlined/>
          </Button>
        </Dropdown>
      </Space>
    </div>
  )
}


export default ActionMenu
