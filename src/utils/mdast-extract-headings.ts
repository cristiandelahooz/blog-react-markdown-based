import Slugger from 'github-slugger'
import { toString } from 'mdast-util-to-string'
import type { Root as MdastRoot } from 'mdast'
import { visit } from 'unist-util-visit'

const slugs = new Slugger()

/*table of content*/
export type TOCHeading = {
  value: string
  id: string
  level: number
}

export const mdastExtractHeadings = (
  mdast: MdastRoot,
  { maxDepth }: { maxDepth: number } = { maxDepth: 3 }
) => {
  slugs.reset()
  const headings: TOCHeading[] = []
  visit(mdast, 'heading', (node, _pos, _parent) => {
    const value = toString(node, { includeImageAlt: false })
    const headingId =
      node.data && node.data.hProperties && (node.data.hProperties.id as string)
    const id = slugs.slug(headingId || value)
    if (node.depth <= maxDepth) {
      headings.push({
        value,
        id,
        level: node.depth
      })
    }
  })
  return headings
}
