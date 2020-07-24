import React from 'react'
import { EnhanceAntdTable } from 'enhance-antd-table'
const App = () => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <EnhanceAntdTable text={'EnhandAntTable 😄'} />
      </div>
    </div>
  )
}

export default App
