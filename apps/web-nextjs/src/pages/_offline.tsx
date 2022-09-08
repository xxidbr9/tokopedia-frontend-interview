import { Empty } from '@/components/empty'
import React from 'react'

const Fallback = () => {
  return (
    <Empty withButton={false} text="Kamu sedang offline !!!"/>
  )
}

export default Fallback