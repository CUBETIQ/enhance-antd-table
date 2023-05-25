import React from 'react'
import { motion, Variant } from 'framer-motion'
import { useTable } from './TableProvider'

const container: { [index: string]: Variant } = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
      type: `tween`
    }
  }
}

const MotionBody: React.FC<any> = ({ children, ...props }) => {
  const { tableRef } = useTable()

  return (
    <motion.tbody
      initial='hidden'
      animate='visible'
      variants={container}
      exit={'hidden'}
      onAnimationComplete={() => {
        tableRef.current?.classList.remove('initial-hidden')
      }}
      {...props}
    >
      {children}
    </motion.tbody>
  )
}

export default MotionBody
