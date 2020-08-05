import React from 'react'
import { Form, Input, Button, InputNumber, Select } from 'antd'

interface FormCreateProps {
  onFinish?: (value: any) => void
  [index: string]: any
}

const tags: { value: string; text: string }[] = [
  {
    value: 'Nice',
    text: 'Nice'
  },
  {
    value: 'Cool',
    text: 'Cool'
  },
  {
    value: 'Teacher',
    text: 'Teacher'
  },
  {
    value: 'Developer',
    text: 'Developer'
  }
]

const selectOptions = tags.map((item) => (
  <Select.Option key={item.value} value={item.value}>
    {item.text}
  </Select.Option>
))

const FormCreate: React.FC<FormCreateProps> = (props) => {
  const { layout, onFinish, onFinishFailed, tailLayout } = props

  return (
    <Form
      {...layout}
      name='basic'
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label='Name'
        name='name'
        rules={[{ required: true, message: 'Please input name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Age'
        name='age'
        rules={[{ required: true, message: 'Please input age!' }]}
      >
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item
        label='Address'
        name='address'
        rules={[{ required: true, message: 'Please input age!' }]}
      >
        <Input.TextArea
          placeholder='Address'
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </Form.Item>

      <Form.Item label='Tags' name='tags'>
        <Select mode='tags' style={{ width: '100%' }} placeholder='Tags'>
          {selectOptions}
        </Select>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default FormCreate
