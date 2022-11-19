import { Input, Space, Table } from 'antd'
import 'antd/dist/antd.css'
import { ButtonProps } from 'antd/es/button'
import { ColumnProps, TableProps } from 'antd/es/table'
import { ColumnTitle } from 'antd/es/table/interface'
import PropTypes from 'prop-types'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ResizableTitle } from './components'
import ActionMenu, { actionMenuPropsInterface } from './components/actionMenu'
import ColumnVisibleController, {
  LiftedColumnVisibleControllerProps
} from './components/columnVisibleController'
import { TableSkeleton } from './components/tableSkeleton'

export interface ComponentExposeState {
  record?: any
  index?: number
  setDataSource: React.Dispatch<React.SetStateAction<any[] | undefined>>
}

interface renderOwnSearchInputArgs {
  setDataSource: React.Dispatch<React.SetStateAction<any[] | undefined>>
}

interface columnsVisibleControllerProps {
  show?: boolean
  options?: LiftedColumnVisibleControllerProps
}

interface enhanceTableInterface<IRowData = any> {
  dataSourceToPrint?: any[]
  newColumns: Array<newColumnsInterface>
  newSources?: Array<any>
  columnsVisibleControllerProps?: columnsVisibleControllerProps
  searchBy?: string
  defaultVisibleColumns?: string[]
  name: string
  printHepler?: (visibleColumns: visibleColumnsInterface[]) => React.ReactNode
  restProps?: TableProps<IRowData>
  headerClassName?: string
  actionColumnProps?: any
  headerStyle?: any
  resizableTitle?: boolean
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
  renderOwnSearchInput?: (
    renderOwnSearchInputArgs: renderOwnSearchInputArgs
  ) => React.ReactNode
}

export interface newColumnsInterface<T = any> extends ColumnProps<T> {
  dataIndex: string
}

export interface visibleColumnsInterface {
  visible: boolean
  title: ColumnTitle<any>
  dataIndex: string
  printRender?: Function
}

export interface createButtonPropsInterface extends ButtonProps {}

const tableNamePrefix = '__eTable__'
export const actionDataIndex = '__action'

const getColumnVisibleObj = (
  item: newColumnsInterface,
  visible: boolean = true
) => {
  const obj: visibleColumnsInterface = {
    dataIndex: item.dataIndex,
    title: item.title,
    visible
  }

  if (item.render) {
    obj.printRender = item.render
  }

  return obj
}

const EnhanceAntdTable: React.FC<enhanceTableInterface> = (props) => {
  const {
    actionDelete,
    actionDetails,
    renderOwnActionMenu,
    actionColumnProps,
    newColumns,
    headerClassName = '',
    headerStyle = {},
    defaultVisibleColumns = []
  } = props
  const [dataSource, setDataSource] = useState(props.newSources)
  const [searchValue, setSearchValue] = useState<string>('')
  const componentRef = useRef(null)

  // use to store temp columns for customization
  const [columns, setColumns] = useState<Array<newColumnsInterface>>([])

  useMemo(() => {
    const getAdditionalColumns = () => {
      const additionalColumns: any[] = []

      if (actionDelete || actionDetails || renderOwnActionMenu) {
        additionalColumns.push({
          title: 'Action',
          ...actionColumnProps,
          dataIndex: actionDataIndex,
          key: actionDataIndex,

          render: (_: any, record: any, index: number) => {
            const stateToExpose = {
              record,
              index,
              setDataSource
            }

            return renderOwnActionMenu ? (
              renderOwnActionMenu(stateToExpose)
            ) : (
              <ActionMenu
                delete={actionDelete && actionDelete(stateToExpose)}
                detail={actionDetails && actionDetails(stateToExpose)}
              />
            )
          }
        })
      }

      return additionalColumns
    }

    const columns = [...(newColumns || []), ...getAdditionalColumns()]
    const cols = columns.map((column: newColumnsInterface, index: number) => {
      return {
        ...column,
        onHeaderCell: (col: any): any => ({
          width: col.width || 200,
          onResize: handleResize(index)
        })
      }
    })

    console.log('Data cols', cols)
    setColumns(cols)
  }, [
    dataSource,
    renderOwnActionMenu,
    actionDetails,
    actionColumnProps,
    actionDelete,
    newColumns
  ])

  const [visibleColumns, setVisibleColumns] = useState<
    visibleColumnsInterface[]
  >([])

  const columnsVisibleConfigKey = useMemo(
    () => tableNamePrefix + props.name,
    []
  )

  useEffect(() => {
    let userColumnsVisibleConfig: any = localStorage.getItem(
      columnsVisibleConfigKey
    )
    let newColumnsVisible: visibleColumnsInterface[] = []
    if (userColumnsVisibleConfig) {
      userColumnsVisibleConfig = JSON.parse(userColumnsVisibleConfig)
      newColumnsVisible = columns.map((item) =>
        getColumnVisibleObj(
          item,
          userColumnsVisibleConfig.some(
            (userColDataIndex: string) => userColDataIndex === item.dataIndex
          )
        )
      )
    } else {
      if (defaultVisibleColumns.length > 0) {
        columns.forEach((item) => {
          const foundItem = defaultVisibleColumns.some(
            (d) => d === item.dataIndex
          )
          let newColumn = foundItem
            ? getColumnVisibleObj(item, true)
            : getColumnVisibleObj(item, false)

          newColumnsVisible.push(newColumn)
        })
      } else {
        newColumnsVisible = columns.map((item) => getColumnVisibleObj(item))
      }
    }

    setVisibleColumns(newColumnsVisible)
  }, [columnsVisibleConfigKey])

  useEffect(() => {
    setDataSource(props.newSources)
  }, [props.newSources])

  const tableHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 10,
    flexWrap: 'wrap',
    ...headerStyle
  }

  const renderHeaderComponent = (self: any = {}) => {
    return {
      header: {
        cell: ResizableTitle
      }
    }
  }

  const handleResize =
    (index: number) =>
    // @ts-ignore
    (e: any, { size }) => {
      setColumns((columns: any) => {
        const nextColumns = [...columns]
        nextColumns[index] = {
          ...nextColumns[index],
          width: size.width
        }

        return nextColumns
      })
    }

  return (
    <React.Fragment>
      <div
        style={tableHeaderStyle}
        className={'e-tableHeader ' + headerClassName}
      >
        <Space
          style={{
            flexWrap: 'wrap'
          }}
        >
          {props.renderCreateButton &&
            props.renderCreateButton({
              setDataSource
            })}

          {props.columnsVisibleControllerProps?.show && (
            <ColumnVisibleController
              tableName={tableNamePrefix + props.name}
              setVisibleColumns={setVisibleColumns}
              visibleColumns={visibleColumns}
              {...props.columnsVisibleControllerProps?.options}
            />
          )}
          {props.printHepler && props.printHepler(visibleColumns)}
        </Space>

        {props.renderOwnSearchInput ? (
          props.renderOwnSearchInput({
            setDataSource
          })
        ) : (
          <div
            style={{
              marginLeft: 'auto'
            }}
          >
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
        )}
      </div>

      <div ref={componentRef}>
        <Table
          {...props.restProps}
          components={{
            ...renderHeaderComponent(props.restProps?.components || {})
          }}
          dataSource={dataSource}
          columns={columns.filter((item) =>
            visibleColumns.some(
              (visibleCol) =>
                visibleCol.dataIndex === item.dataIndex && visibleCol.visible
            )
          )}
        />
      </div>
    </React.Fragment>
  )
}

EnhanceAntdTable.defaultProps = {
  searchBy: 'name'
}

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
EnhanceAntdTable.propTypes = {
  /** table name. */
  name: PropTypes.string.isRequired
}

export default EnhanceAntdTable
export { TableSkeleton }
