import markdownContent from '@/example.md?raw'
import { useContentStore } from '@/stores/content'
import { Box } from '@kuma-ui/core'
import React, { useEffect } from 'react'
import './markdown-view.css'
import { useVisibleSections } from '@/hooks/use-visible-sections'

export const MarkdownView: React.FC = () => {
  const { dom, render } = useContentStore()
  useEffect(() => {
    render(markdownContent)
  }, [render])
  useVisibleSections()
  return <Box className="markdown-view">{dom || 'rendering...'}</Box>
}
