import 'antd/dist/antd.css'
import { Button, Input, Table } from 'antd'
import { TableProps, ColumnProps } from 'antd/es/table'
import { ButtonProps } from 'antd/es/button'
import React from 'react'
import ActionMenu from './components/actionMenu'


interface enhanceTableInterface<IRowData = any> extends TableProps<IRowData> {
  newColumns: Array<newColumnsInterface>
  newSources?: Array<any>
  createButtonProps?: createButtonPropsInterface
  printButtonProps?: createButtonPropsInterface
}

export interface newColumnsInterface<T = any> extends ColumnProps<T> {
}

export interface createButtonPropsInterface extends ButtonProps {

}

const EnhanceAntdTable: React.FC<enhanceTableInterface> = (props) => {
  const defaultColumns: Array<newColumnsInterface> = [
    ...(props.newColumns || []),
    {
      title: 'Action',
      key: 'action',
      render: () => <ActionMenu/>
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
          <Input placeholder="Search"/>
        </div>
      </div>
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
