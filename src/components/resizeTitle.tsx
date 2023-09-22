import React from 'react'
import { Resizable, ResizableProps } from 'react-resizable'
import 'react-resizable/css/styles.css'

const ResizableTitle: React.FC<ResizableProps> = (props) => {
  const { children, onResize, width, ...restProps } = props

  if (!width) {
    return <th {...restProps} />
  }

  return (
    <Resizable width={width} height={0} onResize={onResize} {...restProps}>
      {children}
    </Resizable>
  )
}

export default ResizableTitle
