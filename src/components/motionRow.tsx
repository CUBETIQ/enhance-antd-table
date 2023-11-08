import React from 'react'
import { motion } from 'framer-motion'

const item = {
  hidden: { x: 50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1
  }
}

const MotionRow: React.FC<any> = (props) => {
  //@ts-ignore
  const { children, ...rest } = props || {}
  return (
    <motion.tr {...props} variants={item}>
      <>{children}</>
    </motion.tr>
  )
}

export default MotionRow
