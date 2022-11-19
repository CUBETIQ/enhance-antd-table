import React from 'react'
import { Resizable } from 'react-resizable'
import './resizable.css'

const ResizableTitle: React.FC<any> = (props) => {
  const { onResize, width, ...restProps } = props

  if (!width) {
    console.log('Cannot find width for resizable title...')
    return <th {...restProps} />
  }

  return (
    <Resizable
      width={parseInt(width)}
      height={0}
      handle={
        <span
          className='react-resizable-handle'
          onClick={(e) => {
            e.stopPropagation()
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  )
}

export default ResizableTitle
