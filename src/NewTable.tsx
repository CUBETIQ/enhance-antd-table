import { Table } from 'antd'
import { TableProps } from 'antd/es/table'
import React from 'react'

interface enhanceTableInterface<IRowData = any> extends TableProps<IRowData> {
  newColumns?: Array<any>
  newSources?: Array<any>
}

const NewTable: React.FC<enhanceTableInterface> = (props) => {
  return (
    <Table
      bordered={props.bordered}
      dataSource={props.newSources}
      columns={props.newColumns}
    />
  )
}

NewTable.defaultProps = {
  bordered: true
}

export default NewTable
