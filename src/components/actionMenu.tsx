import { Button, Dropdown, Menu, Modal, Space } from 'antd'
import { DeleteOutlined, DownOutlined, ExpandOutlined } from '@ant-design/icons/lib'
import React, { useState } from 'react'

const ActionMenu = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const menu = (
    <Menu>
      <Menu.Item key='1' icon={<ExpandOutlined/>}>
        Detail
      </Menu.Item>
      <Menu.Item key='2' icon={<DeleteOutlined/>} onClick={() => setOpenDeleteModal(true)}>
        Delete
      </Menu.Item>
    </Menu>
  )
  return (
    <div>
      <div>
        <Modal
          okButtonProps={{ type: 'primary' }}
          okText={'Yes'}
          cancelText={'No'}
          centered={true}
          title={'Delete'}
          width={350}
          visible={openDeleteModal}
          onCancel={() => setOpenDeleteModal(false)
          }>
          <div style={{ alignItems: 'center' }}>
            <h3>Are you sure you want to delete this?</h3>
          </div>
        </Modal>
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
