import MarkdownRenderer from '@/utils/markdown-renderer'
import type { Root as HastRoot } from 'hast'
import type { Root as MdastRoot } from 'mdast'
import { EXIT, visit } from 'unist-util-visit'
import YAML from 'yaml'
import { create } from 'zustand'
import { useTocStore } from './toc'

type ContentType = React.ReactElement<
  unknown,
  string | React.JSXElementConstructor<any>
>

interface ContentState {
  renderId: number
  dom: ContentType | null
  mdast: MdastRoot | null
  hast: HastRoot | null
  title: string | null
  render: (markdown: string) => Promise<void>
  lastError: Error | null | undefined
}

const render = new MarkdownRenderer()

export const useContentStore = create<ContentState>(set => ({
  renderId: 0,
  dom: null,
  mdast: null,
  hast: null,
  title: null,
  lastError: null,
  render: async (markdown: string) => {
    try {
      const { result, mdast, hast } = await render.render(markdown)

      let title = ''
      visit(mdast, 'yaml', (node: any) => {
        const frontmatter = YAML.parse(node.value)
        title = frontmatter.title || ''
        return EXIT
      })

      useTocStore.getState().update(mdast as MdastRoot)
      set({
        dom: result as unknown as ContentType,
        mdast: mdast as MdastRoot,
        hast: hast as HastRoot,
        title,
        lastError: null
      })
    } catch (e: any) {
      console.error(`Failed to render preview: ${e.stack}`)
      set({
        dom: null,
        mdast: null,
        hast: null,
        title: null,
        lastError: new Error('Failed to render markdown')
      })
    }
  }
}))
