import React from 'react'

interface TableContextProps {
  tableRef: React.MutableRefObject<HTMLElement>
}

const TableContext = React.createContext<TableContextProps>({
  tableRef: null
} as any)

const TableProvider: React.FC<React.PropsWithChildren<TableContextProps>> = (
  props
) => {
  const tableRef = props.tableRef || React.useRef(null)

  return (
    <TableContext.Provider
      value={{
        tableRef
      }}
    >
      {props.children}
    </TableContext.Provider>
  )
}

export const useTable = () => React.useContext(TableContext)

export default TableProvider
