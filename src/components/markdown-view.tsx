import markdownContent from '@/example.md?raw'
import { useContentStore } from '@/stores/content'
import { Box } from '@kuma-ui/core'
import React, { useEffect } from 'react'

export const MarkdownView: React.FC = () => {
  const { dom, render } = useContentStore()
  useEffect(() => {
    render(markdownContent)
  }, [render])
  return <Box className="markdown-view">{dom || 'rendering...'}</Box>
}
