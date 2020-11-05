### Import:

```jsx static
import Table from "enhanced-antd-table"; 

``` 

### Example:

```jsx
import { Tag } from 'antd';
const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      render: (tags) => (
        <div>
          {tags.map((tag, index) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={index}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </div>
      ),
    },
  ];

const data = [{
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
  }];

<Table
  newColumns={columns}
  newSources={data}
/>
```
