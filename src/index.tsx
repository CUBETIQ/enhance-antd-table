import React, { useCallback, useRef, useState } from 'react'
import 'antd/dist/antd.css'
import { Button, Input, Space, Table } from 'antd'
import ReactToPrint from 'react-to-print'
import { ColumnProps, TableProps } from 'antd/es/table'
import { ButtonProps } from 'antd/es/button'
import ActionMenu, { actionMenuPropsInterface } from './components/actionMenu'
import ColumnVisibleController from './components/columnVisibleController'

export interface ComponentExposeState {
  record?: any
  index?: number
  setDataSource: React.Dispatch<React.SetStateAction<any[] | undefined>>
}

interface enhanceTableInterface<IRowData = any> extends TableProps<IRowData> {
  newColumns: Array<newColumnsInterface>
  newSources?: Array<any>
  printButton?: boolean
  searchBy?: string
  actionDetails?: (
    ComponentExposeState: ComponentExposeState
  ) => actionMenuPropsInterface
  actionDelete?: (
    ComponentExposeState: ComponentExposeState
  ) => actionMenuPropsInterface
  renderOwnActionMenu?: (
    ComponentExposeState: ComponentExposeState
  ) => React.ReactNode
  renderCreateButton?: (
    ComponentExposeState: ComponentExposeState
  ) => React.ReactNode
}

export interface newColumnsInterface<T = any> extends ColumnProps<T> {
  dataIndex: string
}

export interface visibleColumnsInterface {
  visible: boolean
  dataIndex: string
}

export interface createButtonPropsInterface extends ButtonProps {
}

const EnhanceAntdTable: React.FC<enhanceTableInterface> = (props) => {
  const [dataSource, setDataSource] = useState(props.newSources)
  const [searchValue, setSearchValue] = useState<string>('')
  const componentRef = useRef(null)
  const reactToPrintContent = useCallback(() => {
    return componentRef.current
  }, [componentRef.current])

  const getDefaultColumns: () => Array<newColumnsInterface> = useCallback(() => {
    return [
      ...(props.newColumns || []),
      {
        title: 'Action',
        dataIndex: '__action',
        key: 'name',
        render: (record, _, index) => {
          const stateToExpose = {
            record,
            index,
            setDataSource
          }

          return props.renderOwnActionMenu ? (
            props.renderOwnActionMenu(stateToExpose)
          ) : (
            <ActionMenu
              delete={props.actionDelete && props.actionDelete(stateToExpose)}
              detail={props.actionDetails && props.actionDetails(stateToExpose)}
            />
          )
        }
      }
    ]
  }, [setDataSource])

  const [visibleColumns, setVisibleColumns] = useState(() =>
    getDefaultColumns().map((item) => ({
      dataIndex: item.dataIndex,
      visible: true
    }))
  )

  const reactToPrintTrigger = React.useCallback(() => {
    return <Button>Print</Button>
  }, [])

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 10,
          marginBottom: 10
        }}
      >
        <Space>
          {props.renderCreateButton &&
          props.renderCreateButton({
            setDataSource
          })}

          <ColumnVisibleController
            setVisibleColumns={setVisibleColumns}
            visibleColumns={visibleColumns}
            getDefaultColumns={getDefaultColumns}
          />
          {props.printButton === true ? (
            <div>
              <ReactToPrint
                content={reactToPrintContent}
                trigger={reactToPrintTrigger}
              />
            </div>
          ) : null}
        </Space>
        <div>
          <Input
            placeholder='Search'
            value={searchValue}
            onChange={(e) => {
              const currentSearchValue = e.target.value
              setSearchValue(currentSearchValue)
              const filteredData =
                props.newSources &&
                props.newSources.filter((entry) => {
                  let lowerName = entry.name.toLocaleLowerCase()
                  let valueSearch = currentSearchValue.toLocaleLowerCase()
                  return lowerName.includes(valueSearch)
                })
              setDataSource(filteredData)
            }}
          />
        </div>
      </div>
      <div ref={componentRef}>
        <Table
          bordered={props.bordered}
          dataSource={dataSource}
          columns={getDefaultColumns().filter((item) =>
            visibleColumns.some(
              (visibleCol) =>
                visibleCol.dataIndex === item.dataIndex && visibleCol.visible
            )
          )}
        />
      </div>
    </div>
  )
}

EnhanceAntdTable.defaultProps = {
  bordered: true,
  searchBy: 'name'
}

export default EnhanceAntdTable
