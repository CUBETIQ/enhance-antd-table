import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Tag, Button } from 'antd'
import EnhanceAntdTable, { newColumnsInterface } from '../index'

const dummy = [
  {
    name: 'លីហួរ',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  },
  {
    name: 'LyhourChhen',
    age: 322,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  },
  {
    name: 'LyhourChhen1',
    age: 322,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  },
  {
    name: 'LyhourChhen2',
    age: 322,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
]

let data: any[] = []

for (let i = 0; i < 4; i++) {
  data.push(...dummy)
}

const columns: Array<newColumnsInterface> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',

    render: (tags: any) => (
      <div>
        {tags.map((tag: any, index: number) => {
          let color = tag.length > 5 ? 'geekblue' : 'green'
          if (tag === 'loser') {
            color = 'volcano'
          }
          return (
            <Tag color={color} key={index}>
              {tag.toUpperCase()}
            </Tag>
          )
        })}
      </div>
    )
  }
]

const args = {
  columnsVisibleControllerProps: {
    show: true
  },
  newColumns: columns,
  newSources: data,
  restProps: {
    bordered: true,
    scroll: { x: 1550 },
    size: 'small',
    rowKey: 'id'
  },
  renderOwnSearchInput: () => {
    return <div>search</div>
  },
  renderOwnActionMenu: () => {
    return <div></div>
  },

  options: {
    trigger: () => {
      return <Button>Columns</Button>
    }
  },
  renderCreateButton: () => {
    return <div>create</div>
  },
  defaultVisibleColumns: ['name', 'address', 'tags']
}

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Table',
  component: EnhanceAntdTable
} as ComponentMeta<typeof EnhanceAntdTable>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EnhanceAntdTable> = (args) => (
  <EnhanceAntdTable {...args} />
)

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = args
