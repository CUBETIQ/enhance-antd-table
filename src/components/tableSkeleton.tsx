import React, { ReactElement } from 'react'
import styles from '../styles.module.css'

interface tableSkeletonProps {
  loading?: boolean
  children: ReactElement<any, any>
}

const TableSkeleton: React.FC<tableSkeletonProps> = (props) => {
  //@ts-ignore
  const { loading } = props

  if (loading) {
    return <div className={styles.tableSkeleton}></div>
  }
  return props.children
}

export default TableSkeleton
