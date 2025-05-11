import { createRehypeHeading } from '@/components/heading'
import jsxRuntime from 'react/jsx-runtime'
import rehype2react, { Components as JSXComponents } from 'rehype-react'
import rehypeSlug from 'rehype-slug'
import remark2rehype from 'remark-Rehype'
import frontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import type { Processor } from 'unified'

const rehypeReactComponents: Partial<JSXComponents> = {
  h1: createRehypeHeading(1),
  h2: createRehypeHeading(2),
  h3: createRehypeHeading(3),
  h4: createRehypeHeading(4),
  h5: createRehypeHeading(5),
  h6: createRehypeHeading(6)
}

export default class MarkdownRenderer {
  processor: Processor | null = null
  createProcessor() {
    const remarkParser = unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(frontmatter)
    const md2html = remarkParser().use(remark2rehype, {
      allowDangerousHtml: true
    })
    const html2react = md2html.use(rehype2react, {
      Fragment: jsxRuntime.Fragment as any,
      jsx: jsxRuntime.jsx as any,
      jsxs: jsxRuntime.jsxs as any,
      components: rehypeReactComponents
    })
    this.processor = html2react
    return html2react
  }
  async getProcessor(): Promise<Processor> {
    if (this.processor) return this.processor
    return this.createProcessor()
  }
  async render(markdown: string) {
    const processor = await this.getProcessor()
    const mdast = processor.parse(markdown)
    const hast = await processor.run(mdast)
    const result = processor.stringify(hast)
    return {
      result,
      mdast,
      hast
    }
  }
}
