import { create } from 'zustand'
import type { Root } from 'mdast'
import {
  mdastExtractHeadings,
  TOCHeading
} from '@/utils/mdast-extract-headings'

export type Section = TOCHeading
export type TocState = {
  sections: Section[]
  update: (mdast: Root) => void
}

export const useTocStore = create<TocState>(set => ({
  sections: [],
  update: (mdast: Root) => {
    if (mdast) {
      const sections = mdastExtractHeadings(mdast)
      set({ sections })
    } else {
      set({ sections: [] })
    }
  }
}))
