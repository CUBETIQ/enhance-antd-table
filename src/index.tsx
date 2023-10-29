import React, { useState, useRef, useEffect, useMemo } from 'react'
import { Input, Space, Table } from 'antd'
import { ColumnProps, TableProps } from 'antd/es/table'
import { ButtonProps } from 'antd/es/button'
import ActionMenu, { actionMenuPropsInterface } from './components/actionMenu'
import ColumnVisibleController from './components/columnVisibleController'
import { ColumnTitle } from 'antd/es/table/interface'
import { LiftedColumnVisibleControllerProps } from './components/columnVisibleController'
import { TableSkeleton } from './components/tableSkeleton'
import ResizableTitle from './components/resizeTitle'
// import MotionBody from './components/motionBody'
// import MotionRow from './components/motionRow'
import styled from 'styled-components'

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
  printHelper?: (visibleColumns: visibleColumnsInterface[]) => React.ReactNode
  restProps?: TableProps<IRowData>
  headerClassName?: string
  actionColumnProps?: any
  headerStyle?: any
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

const EnhancedTableStyled = styled.div``

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
  let {
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

  const [defaultColumns, setDefaultColumns] = useState<
    Array<newColumnsInterface>
  >([])

  useEffect(() => {
    const getAdditionalColumns = () => {
      let additionalColumns: any[] = []

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

    let result = [...(newColumns || []), ...getAdditionalColumns()]

    const handleResize =
      (index: any) =>
      (e: any, { size }: any) => {
        setDefaultColumns((old: any) => {
          const nextColumns = [...old]
          nextColumns[index] = {
            ...nextColumns[index],
            width: size.width
          }
          return nextColumns
        })
      }

    result = result.map((item, index) => {
      return {
        ...item,

        onHeaderCell: (column: any) =>
          ({
            width: column.width || 10,
            onResize: handleResize(index)
          }) as any
      }
    })

    setDefaultColumns(result)
  }, [
    dataSource,
    renderOwnActionMenu,
    actionDetails,
    actionColumnProps,
    actionDelete,
    newColumns
  ])

  const columnsVisibleConfigKey = useMemo(
    () => tableNamePrefix + props.name,
    []
  )

  const getVisibleColumns = () => {
    let userColumnsVisibleConfig: any = localStorage.getItem(
      columnsVisibleConfigKey
    )
    let newColumnsVisible: visibleColumnsInterface[] = []
    if (userColumnsVisibleConfig) {
      userColumnsVisibleConfig = JSON.parse(userColumnsVisibleConfig)
      newColumnsVisible = defaultColumns.map((item) =>
        getColumnVisibleObj(
          item,
          userColumnsVisibleConfig.some(
            (userColDataIndex: string) => userColDataIndex === item.dataIndex
          )
        )
      )
    } else {
      if (defaultVisibleColumns.length > 0) {
        defaultColumns.forEach((item) => {
          const foundItem = defaultVisibleColumns.some(
            (d) => d == item.dataIndex
          )

          let newColumn = foundItem
            ? getColumnVisibleObj(item, true)
            : getColumnVisibleObj(item, false)

          newColumnsVisible.push(newColumn)
        })
      } else {
        newColumnsVisible = defaultColumns.map((item) =>
          getColumnVisibleObj(item)
        )
      }
    }

    return newColumnsVisible
  }

  const [visibleColumns, setVisibleColumns] = useState<
    visibleColumnsInterface[]
  >(getVisibleColumns())

  useEffect(() => {
    let newColumnsVisible = getVisibleColumns()

    setVisibleColumns(newColumnsVisible)
  }, [columnsVisibleConfigKey, defaultColumns])

  useEffect(() => {
    setDataSource(props.newSources)
  }, [props.newSources])

  let tableHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 10,
    flexWrap: 'wrap',
    ...headerStyle
  }

  let columnsResult = defaultColumns.filter((item) => {
    return visibleColumns.some((visibleCol) => {
      let a = visibleCol.dataIndex == item.dataIndex

      return a && visibleCol.visible
    })
  })

  return (
    <React.Fragment>
      <div
        style={tableHeaderStyle}
        className={` e-tableHeader ` + headerClassName}
      >
        <Space
          style={{
            flexWrap: 'wrap'
          }}
        >
          <React.Fragment>
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
            {props.printHelper && props.printHelper(visibleColumns)}
          </React.Fragment>
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

      <EnhancedTableStyled ref={componentRef}>
        <Table
          {...props.restProps}
          dataSource={dataSource}
          columns={columnsResult}
          components={{
            ...props.restProps?.components,
            header: {
              cell: ResizableTitle
            }
            // body: {
            //   wrapper: MotionBody,
            //   row: MotionRow
            // }
          }}
        />
      </EnhancedTableStyled>
    </React.Fragment>
  )
}

EnhanceAntdTable.defaultProps = {
  searchBy: 'name'
}

export { TableSkeleton }

export default EnhanceAntdTable
