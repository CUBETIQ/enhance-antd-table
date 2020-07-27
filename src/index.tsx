import React, { useState, useRef } from 'react'
import 'antd/dist/antd.css'
import { Button, Input, Table } from 'antd'
import ReactToPrint from 'react-to-print'
import { TableProps, ColumnProps } from 'antd/es/table'
import { ButtonProps } from 'antd/es/button'
import ActionMenu, { actionMenuPropsInterface } from './components/actionMenu'

interface enhanceTableInterface<IRowData = any> extends TableProps<IRowData> {
  newColumns: Array<newColumnsInterface>
  newSources?: Array<any>
  createButtonProps?: createButtonPropsInterface
  printButton?: boolean
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
  const componentRef = useRef(null)
  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current
  }, [componentRef.current])
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

  const reactToPrintTrigger = React.useCallback(() => {
    return <Button>Print</Button>
  }, [])


  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, marginBottom: 10 }}>
        <div style={{ display: 'flex' }}>
          {props.createButtonProps !== undefined ? <div>
            <Button {...props.createButtonProps}>Create</Button>
            <span style={{ margin: 10 }}/>
          </div> : null}
          {props.printButton === true ? <div>
            <ReactToPrint content={reactToPrintContent} trigger={reactToPrintTrigger}/>
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
      <div ref={componentRef}>
        <Table
          bordered={props.bordered}
          dataSource={dataSource}
          columns={defaultColumns}
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
