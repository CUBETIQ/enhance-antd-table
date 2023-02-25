# CUBETIQ Enhance-Antd-Table

> Stil Ant Design Table but more...

[![NPM](https://img.shields.io/npm/v/@cubetiq/enhance-antd-table.svg)](https://www.npmjs.com/package/@cubetiq/enhance-antd-table) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## ✨ Features

- [x] Columns Visibility.

## Install

Antd v4

```bash
yarn add @cubetiq/enhance-antd-table@^1.0.10
```

Antd v5

```bash
yarn add @cubetiq/enhance-antd-table@^2.0.0
```

## Usage

**[Full tutorial](https://cubetiq.github.io/enhance-antd-table)**

```tsx
import React, { Component } from 'react'

import EnhanceAntdTable from '@cubetiq/enhance-antd-table'

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
          <Menu.Item key={uuid()} icon={<DeleteOutlined />}>
            Delete
          </Menu.Item>
        </Menu>
      }
      bordered={true}
      newColumns={columns}
      newSources={data}
    />
  )
}
```

## Props

- **Everything from AntdProps and plus+**

```tsx
import { props } from 'antd/es/table'
```

- **newColumnsInterface**: Your table column but should include the interface from interface.

```tsx
import { newColumnsInterface } from '@cubetiq/enhance-antd-table'

const columns: Array<newColumnsInterface> = [
  {
    title: 'name',
    dataIndex: 'name',
    key: 'name'
  }
]
```

- **newSources**: Your sources data.

```tsx
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  }
]
```

- **createButtonProps**: Create button props.

```tsx
<EnhanceAntdTable
  createButtonProps={{
    onClick: () => setModal(true)
  }}
/>
```

- **printButton**: Do you need print in table or not?

```tsx
	 printButton={true}
```

- **searchBy**: Define the search by each column (Not available).

```tsx
	  searchBy={"name"}
```

- **actionDetails**: more props for action details.

```tsx
	actionDetails={{
	  onClick: () => console.log('render from action delete')
	}}
```

- **actionDelete**: more props for action delete.

```tsx
	actionDetails={{
	  onClick: () => console.log('render from action delete')
	}}
```

- **renderOwnActionMenu**: Render own action menu but will be overriden the default action menu.

- Should use **Menu** and **Menu. Item** from ant-design.

```tsx
	renderOwnActionMenu={
	 <Menu>
	    <Menu.Item key={uuid()} icon={<DeleteOutlined/>}>
	      Delete
	    </Menu.Item>
	 </Menu>
	}
```

## License

MIT © 2023

- [LyhourChhen](https://github.com/LyhourChhen)
- [vuthPov](https://github.com/vuthpov)
- [Sambo Chea](https://github.com/sombochea)
