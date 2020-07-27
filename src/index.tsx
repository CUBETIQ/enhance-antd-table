import 'antd/dist/antd.css'
import { Button, Input, Table } from 'antd'
import { TableProps, ColumnProps } from 'antd/es/table'
import { ButtonProps } from 'antd/es/button'
import React, { useState } from 'react'
import ActionMenu, { actionMenuPropsInterface } from './components/actionMenu'

interface enhanceTableInterface<IRowData = any> extends TableProps<IRowData> {
  newColumns: Array<newColumnsInterface>
  newSources?: Array<any>
  createButtonProps?: createButtonPropsInterface
  printButtonProps?: createButtonPropsInterface
  searchBy?: string,
  actionDetails?: actionMenuPropsInterface,
  actionDelete?: actionMenuPropsInterface,
  renderOwnActionMenu?: React.ReactNode
}

export interface newColumnsInterface<T = any> extends ColumnProps<T> {
}

export interface createButtonPropsInterface extends ButtonProps {
}

const EnhanceAntdTable: React.FC<enhanceTableInterface> = (props) => {
  const [dataSource, setDataSource] = useState(props.newSources)
  const [searchValue, setSearchValue] = useState<string>('')
  const defaultColumns: Array<newColumnsInterface> = [
    ...(props.newColumns || []),
    {
      title: 'Action',
      key: 'action',
      render: () => <ActionMenu delete={props.actionDelete}
                                detail={props.actionDetails}
                                renderNew={props.renderOwnActionMenu}/>
    }
  ]
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, marginBottom: 10 }}>
        <div style={{ display: 'flex' }}>
          {props.createButtonProps !== undefined ? <div>
            <Button {...props.createButtonProps}>Create</Button>
            <span style={{ margin: 10 }}/>
          </div> : null}
          {props.printButtonProps !== undefined ? <div>
            <Button {...props.printButtonProps}>Print</Button>
          </div> : null}
        </div>
        <div>
          <Input placeholder="Search"
                 value={searchValue}
                 onChange={(e) => {
                   const currentSearchValue = e.target.value
                   setSearchValue(currentSearchValue)

                   const filteredData = props.newSources && props.newSources.filter(entry => {
                       console.log(entry)
                       return entry.name.includes(currentSearchValue)
                     }
                   )
                   setDataSource(filteredData)
                 }}
          />
        </div>
      </div>
      <Table
        bordered={props.bordered}
        dataSource={dataSource}
        columns={defaultColumns}
      />
    </div>
  )
}

EnhanceAntdTable.defaultProps = {
  bordered: true,
  searchBy: 'name'
}

export default EnhanceAntdTable
