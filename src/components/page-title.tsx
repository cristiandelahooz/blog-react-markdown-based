import { useContentStore } from '@/stores/content'
import { Heading } from '@kuma-ui/core'
import React from 'react'

export const PageTitle: React.FC = () => {
  const { title } = useContentStore()
  return <Heading px={'1em'}>{title}</Heading>
}
