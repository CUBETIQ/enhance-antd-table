import React from 'react'
import { Button, Modal } from 'antd'
import moment from 'moment'
import pdfMake from 'pdfmake/build/pdfmake'
//@ts-ignore
import pdfFonts from './vfs_fonts'
import { visibleColumnsInterface } from '..'
import { TDocumentDefinitions, TableCell } from 'pdfmake/interfaces'
pdfMake.vfs = pdfFonts

export const actionDataIndex = '__action'
const fontPrint = 'kh-battambang'

pdfMake.fonts = {
  [fontPrint]: {
    normal: 'kh-battambang.ttf',
    bold: 'kh-battambang.ttf',
    italics: 'kh-battambang.ttf',
    bolditalics: 'kh-battambang.ttf'
  },
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
  }
}

interface availableFontsProp {
  [index: string]: string
}

const availableFonts: availableFontsProp = {
  kh: fontPrint,
  default: 'Roboto'
}

type ColumnWidthTypes = '*' | 'auto' | Number

export interface PrintProps {
  generateColumnWidths?: (
    columns: visibleColumnsInterface[]
  ) => ColumnWidthTypes[]
  generateColumnHeaders?: (
    columns: visibleColumnsInterface[],
    availableFonts: availableFontsProp
  ) => TableCell[]
  generateTableBody?: (
    data: any[],
    availableFonts: availableFontsProp
  ) => TableCell[]
  docDefinition?: any
  trigger?: () => React.ReactNode
}

export interface ButtonPrintProp extends PrintProps {
  data?: any
  visibleColumns: visibleColumnsInterface[]
  [index: string]: any
}

const buttonPrint: React.FC<ButtonPrintProp> = (props) => {
  const {
    data,
    visibleColumns,
    generateColumnWidths,
    generateColumnHeaders,
    docDefinition: _docDefinition,
    generateTableBody,
    trigger
  } = props

  const handlePrint = () => {
    const xMargin = 25
    const yMargin = 25

    let formatted_date = moment().format('DD/M/YYYY, h:mm:ss a Z')

    const defaultVisibleColumns = visibleColumns.filter(
      (item) => item.visible && item.dataIndex !== actionDataIndex
    )

    const visibleData = data.map((record: any) => {
      let newRecord = {}

      for (let key in record) {
        if (defaultVisibleColumns.some((item) => item.dataIndex === key)) {
          newRecord[key] = record[key]
        }
      }

      return newRecord
    })

    let recordsToPrint = generateTableBody
      ? generateTableBody(visibleData, availableFonts)
      : visibleData.map((record: { [index: string]: any }) => {
          let newRow: TableCell[] = []
          for (let key in record) {
            newRow.push({
              text: record[key],
              fontSize: 12,
              font: fontPrint
            })
          }

          return newRow
        })

    const docDefinition: TDocumentDefinitions = {
      header: {
        text: formatted_date,
        margin: [xMargin, 5, 0, 0]
      },
      pageMargins: [xMargin, yMargin, xMargin, yMargin],
      footer: function (currentPage: number, pageCount: number, pageSize: any) {
        return [
          {
            text: currentPage.toString() + '/' + pageCount.toString(),
            alignment: 'center',
            margin: [0, 3, 0, 0]
          }
        ]
      },
      ..._docDefinition,
      content: [
        {
          table: {
            headerRows: 1,
            widths: generateColumnWidths
              ? generateColumnWidths(defaultVisibleColumns)
              : defaultVisibleColumns.map(() => '*'),
            body: [
              generateColumnHeaders
                ? generateColumnHeaders(defaultVisibleColumns, availableFonts)
                : defaultVisibleColumns.map((item) => ({
                    text: item.title,
                    fontSize: 14,
                    font: fontPrint
                  })),
              ...recordsToPrint
            ]
          }
        }
      ]
    }

    //@ts-ignore
    pdfMake.createPdf(docDefinition).print()
  }

  const printClick = () => {
    const allowPrint =
      visibleColumns.filter((item) => {
        return item.dataIndex !== actionDataIndex && item.visible
      }).length > 0

    if (allowPrint) {
      handlePrint()
    } else {
      Modal.info({
        content:
          'Please show at least one column. Action column does not count!'
      })
    }
  }

  return trigger ? (
    <div onClick={() => printClick()}>{trigger()}</div>
  ) : (
    <Button onClick={printClick}>Print</Button>
  )
}

export default buttonPrint
