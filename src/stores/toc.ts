import {
  TOCHeading,
  mdastExtractHeadings
} from '@/utils/mdast-extract-headings'
import type { Root } from 'mdast'
import { create } from 'zustand'
import { loggerMiddleware } from './logger'

export type Section = TOCHeading
export type TocState = {
  sections: Section[]
  update: (mdast: Root) => void
}

export const useTocStore = create<TocState>(
  loggerMiddleware(set => ({
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
)
