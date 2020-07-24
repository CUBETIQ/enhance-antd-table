import 'antd/dist/antd.css'
import { Table } from 'antd'
import { TableProps, ColumnProps } from 'antd/es/table'
import React from 'react'

interface enhanceTableInterface<IRowData = any> extends TableProps<IRowData> {
  newColumns?: Array<newColumnsInterface>
  newSources?: Array<any>
}

export interface newColumnsInterface<T = any> extends ColumnProps<T> {}

const EnhanceAntdTable: React.FC<enhanceTableInterface> = (props) => {
  return (
    <Table
      bordered={props.bordered}
      dataSource={props.newSources}
      columns={props.newColumns}
    />
  )
}

EnhanceAntdTable.defaultProps = {
  bordered: true
}

export default EnhanceAntdTable
