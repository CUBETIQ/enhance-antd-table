import * as React from 'react'
import styles from './styles.module.css'
import 'antd/dist/antd.css'
import { DatePicker } from 'antd';

interface Props {
  text: string
}

export const ExampleComponent = ({ text }: Props) => {
  return <div className={styles.test}>Example Component: {text}<div><DatePicker /></div></div>
}
