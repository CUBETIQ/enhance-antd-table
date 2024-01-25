import React, { ReactElement } from 'react'
import styled from 'styled-components'

const TableSkeletonStyled = styled.div`
  --skeleton-background: white;
  --skeleton-color: #f3f5f7;
  --table-x-padding: 0px;
  --table-y-padding: 0;
  --create-area-skeleton: linear-gradient(
    var(--skeleton-color) 40px,
    transparent 0
  );
  --create-area-width: 150px;
  --create-area-height: 40px;
  --search-area-skeleton: linear-gradient(
    var(--skeleton-color) 40px,
    transparent 0
  );
  --search-area-width: 200px;
  --search-area-height: 40px;
  --table-skeleton: linear-gradient(
    var(--skeleton-color) calc(100% - 105px),
    transparent 0
  );
  --table-width: calc(100% - var(--table-x-padding) * 2);
  --table-height: 100%;
  --background-skeleton: linear-gradient(
    var(--skeleton-background) 100%,
    transparent 0
  );
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-image: var(--create-area-skeleton), var(--search-area-skeleton),
    var(--table-skeleton), var(--background-skeleton);
  background-size: var(--create-area-width) var(--create-area-height),
    var(--search-area-width) var(--search-area-height),
    var(--table-width) var(--table-height), 100% 100%;
  background-position: var(--table-x-padding) var(--table-y-padding),
    calc(100% - var(--table-x-padding)) var(--table-y-padding),
    var(--table-x-padding) 50px, 0 0;
`

interface tableSkeletonProps {
  loading?: boolean
  children: ReactElement<any, any>
}

const Container: React.FC<{
  loading: boolean | undefined
  children: ReactElement<any, any>
}> = (props) => {
  const { loading, children } = props

  return loading ? (
    <TableSkeletonStyled>{children}</TableSkeletonStyled>
  ) : (
    <div>{children}</div>
  )
}
const TableSkeleton: React.FC<tableSkeletonProps> = (props) => {
  //@ts-ignore
  const { loading, children } = props

  return (
    <Container loading={loading}>
      <div
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        <div>{loading ? <React.Fragment /> : children}</div>
      </div>
    </Container>
  )
}

export { TableSkeleton }
