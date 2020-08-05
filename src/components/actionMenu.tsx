import { Button, Dropdown, Menu, Space } from 'antd'
import {
  DeleteOutlined,
  DownOutlined,
  ExpandOutlined
} from '@ant-design/icons/lib'
import { v4 as uuid } from 'uuid'
import { MenuProps } from 'antd/es/menu'
import React from 'react'

export interface actionMenuPropsInterface extends MenuProps {
  [index: string]: any
}

interface ActionMenuInterface {
  delete?: any
  detail?: any
}

const ActionMenu: React.FC<ActionMenuInterface> = (props) => {
  const menu = () => (
    <div>
      <Menu>
        {props.detail && (
          <Menu.Item key={uuid()} icon={<ExpandOutlined />} {...props.detail}>
            Detail
          </Menu.Item>
        )}
        {props.delete && (
          <Menu.Item key={uuid()} icon={<DeleteOutlined />} {...props.delete}>
            Delete
          </Menu.Item>
        )}
      </Menu>
    </div>
  )
  return (
    <div>
      <Space size='middle'>
        <Dropdown overlay={menu}>
          <Button>
            More <DownOutlined />
          </Button>
        </Dropdown>
      </Space>
    </div>
  )
}

export default ActionMenu
