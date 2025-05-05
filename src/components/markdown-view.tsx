import markdownContent from '@/example.md?raw'
import { Box } from '@kuma-ui/core'
import React from 'react'

export const MarkdownView: React.FC = () => {
  return <Box className="markdown-view">{markdownContent}</Box>
}
