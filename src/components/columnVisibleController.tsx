import React, { useState } from 'react'
import { Button, Dropdown, Menu, Checkbox } from 'antd'
import { newColumnsInterface, visibleColumnsInterface } from '..'
//@ts-ignore
import { CheckboxChangeEvent } from 'antd/lib/checkbox'

interface ColumnVisibleControllerProps {
  setVisibleColumns: React.Dispatch<
    React.SetStateAction<visibleColumnsInterface[] | undefined>
  >
  visibleColumns: visibleColumnsInterface[]
  getDefaultColumns: () => newColumnsInterface[]
}

const dropdownId = '__dropdown-visible__'

const ColumnVisibleController: React.FC<ColumnVisibleControllerProps> = (
  props
) => {
  //@ts-ignore
  const { getDefaultColumns, visibleColumns, setVisibleColumns } = props
  //@ts-ignore
  const [dropdownVisible, setDropdownVisible] = useState(false)

  const renderMenus = () => {
    const checkboxGroupChange = (values: string[]) => {
      const newColumns = [...visibleColumns].map((item) => {
        const visible = values.some(
          (visibleCol) => visibleCol === item.dataIndex
        )
        return { ...item, visible }
      })

      setVisibleColumns(newColumns)
    }

    let checkedCount = visibleColumns.reduce((acc, curr) => {
      return curr.visible ? acc + 1 : acc
    }, 0)

    const checkboxAllChecked = visibleColumns.length === checkedCount
    const checkboxAllIntermediate =
      checkedCount > 0 && checkedCount < visibleColumns.length

    return (
      <div>
        <Checkbox.Group
          value={visibleColumns
            .filter((item) => item.visible)
            .map((item) => item.dataIndex)}
          onChange={checkboxGroupChange}
        >
          <Menu
            style={{
              maxHeight: 300,
              overflowY: 'auto'
            }}
          >
            {getDefaultColumns().map((item) => {
              return (
                <Menu.Item key={item.dataIndex}>
                  <Checkbox value={item.dataIndex}>{item.title}</Checkbox>
                </Menu.Item>
              )
            })}
          </Menu>
        </Checkbox.Group>
        <div
          style={{
            background: '#fff',
            padding: '8px 16px 8px 13px',
            border: '1px solid #eee',
            transform: 'translateY(-5px)'
          }}
        >
          <Checkbox
            onChange={(e: CheckboxChangeEvent) => {
              const newVisibleColumns = visibleColumns.map((item) => ({
                ...item,
                visible: e.target.checked
              }))
              setVisibleColumns(newVisibleColumns)
            }}
            checked={checkboxAllChecked}
            indeterminate={checkboxAllIntermediate}
          >
            Show all
          </Checkbox>
        </div>
      </div>
    )
  }

  return (
    <div id={dropdownId}>
      <Dropdown
        overlay={renderMenus()}
        trigger={['click']}
        visible={dropdownVisible}
        getPopupContainer={() => document.getElementById(dropdownId)!}
        onVisibleChange={(visible) => {
          setDropdownVisible(visible)
        }}
      >
        <Button>Columns</Button>
      </Dropdown>
    </div>
  )
}

export default ColumnVisibleController
