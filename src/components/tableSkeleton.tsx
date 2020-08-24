import React, { ReactElement } from 'react'
import styles from '../styles.module.css'

interface tableSkeletonProps {
  loading?: boolean
  children: ReactElement<any, any>
}

const TableSkeleton: React.FC<tableSkeletonProps> = (props) => {
  //@ts-ignore
  const { loading } = props

  return (
    <div className={loading ? styles.tableSkeleton : ''}>
      <div
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        <div
          style={
            loading
              ? {
                  display: 'none'
                }
              : {}
          }
        >
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default TableSkeleton
