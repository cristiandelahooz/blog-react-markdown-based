import {
  TOCHeading,
  mdastExtractHeadings
} from '@/utils/mdast-extract-headings'
import type { Root } from 'mdast'
import { create } from 'zustand'
import { loggerMiddleware } from './logger'
import { RefObject } from 'react'

export type Section = TOCHeading & {
  headingRef: RefObject<HTMLHeadingElement> | null
}
export type TocState = {
  sections: Section[]
  update: (mdast: Root) => void
  registerHeading: (id: string, ref: RefObject<HTMLHeadingElement>) => void
}

export const useTocStore = create<TocState>(
  loggerMiddleware(set => ({
    sections: [],
    update: (mdast: Root) => {
      if (mdast) {
        const sections = mdastExtractHeadings(mdast).map(h => ({
          ...h,
          headingRef: null
        }))
        set({ sections })
      } else {
        set({ sections: [] })
      }
    },
    registerHeading: (id: string, ref: RefObject<HTMLHeadingElement>) => {
      set(state => ({
        sections: state.sections.map(s =>
          s.id === id ? { ...s, headingRef: ref } : s
        )
      }))
    }
  }))
)
