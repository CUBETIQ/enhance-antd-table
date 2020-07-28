import React, { useState } from 'react'
import { Button, Dropdown, Menu, Checkbox } from 'antd'
import { newColumnsInterface, visibleColumnsInterface } from '..'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'

interface ColumnVisibleControllerProps {
  setVisibleColumns: React.Dispatch<
    React.SetStateAction<visibleColumnsInterface[] | undefined>
  >
  visibleColumns: visibleColumnsInterface[]
  getDefaultColumns: () => newColumnsInterface[]
}

const ColumnVisibleController: React.FC<ColumnVisibleControllerProps> = (
  props
) => {
  const { getDefaultColumns, visibleColumns, setVisibleColumns } = props
  const [dropdownVisible, setDropdownVisible] = useState(false)

  const renderMenus = () => {
    return (
      <Menu>
        {getDefaultColumns().map((item, _, defaultColumns) => {
          const checked = visibleColumns.some(
            (col) => col.dataIndex === item.dataIndex
          )

          const checkboxChange = (e: CheckboxChangeEvent) => {
            setVisibleColumns((oldColumns) => {
              let index = oldColumns!.findIndex(
                (oldColumn) => oldColumn.dataIndex === item.dataIndex
              )
              oldColumns![index] = {
                ...oldColumns![index],
                visible: e.target.checked
              }

              //@ts-ignore
              return [...oldColumns]
            })
          }
          return (
            <Menu.Item key={item.dataIndex}>
              <Checkbox defaultChecked={checked} onChange={checkboxChange}>
                {item.title}
              </Checkbox>
            </Menu.Item>
          )
        })}
      </Menu>
    )
  }

  return (
    <Dropdown
      overlay={renderMenus()}
      trigger={['click']}
      visible={dropdownVisible}
      onVisibleChange={(visible) => {
        setDropdownVisible(visible)
      }}
    >
      <Button>Columns</Button>
    </Dropdown>
  )
}

export default ColumnVisibleController
