# Enhance-Antd-Table 

> Stil @antd-table but more and ++

[![NPM](https://img.shields.io/npm/v/antd-table-search.svg)](https://www.npmjs.com/package/enhance-antd-table) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## ✨ Features

-   [x] Basic with fix Action column.
-   [x] Print the whole tables.
-   [x] Adjustment column.
-   [x] Search in the tables.


## Install

```bash
yarn add enhance-antd-table
```

## Usage

```tsx
import React, { Component } from 'react'

import EnhanceAntdTable from 'antd-table-search'
import 'antd-table-search/dist/index.css'

const Example = () => {
    return (
      <EnhanceAntdTable
          createButtonProps={{
            onClick: () => setModal(true)
          }}
          printButton={true}
          actionDelete={{
            onClick: () => console.log('render from action delete')
          }}
          actionDetails={{
            onClick: () => console.log('render from action details')
          }}
          renderOwnActionMenu={
            <Menu>
              <Menu.Item key={uuid()} icon={<DeleteOutlined/>}>
                Delete
              </Menu.Item>
            </Menu>
          }
          bordered={true}
          newColumns={columns}
          newSources={data}
     />
  );
}
```
## Props 
 - **Everything from AntdProps and plus+**
 - **newColumns**: Your table column but should include the interface from interface.
 - **newSources**: Your sources data.
 - **createButtonProps**: Create button props.
 - **printButton**: Do you need print in table or not? 
 - **searchBy**: Define the search by each column (Not available).
 - **actionDetails**: more props for action details.
 - **actionDelete**: more props for action delete. 
 - **renderOwnActionMenu**: Render own action menu but will be overriden the default action menu.
  

## License

MIT © [LyhourChhen](https://github.com/LyhourChhen)
