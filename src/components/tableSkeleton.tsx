import React, { ReactElement } from 'react'
import styles from '../styles.module.less'

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
        <div>{loading ? <React.Fragment /> : props.children}</div>
      </div>
    </div>
  )
}

export { TableSkeleton }
