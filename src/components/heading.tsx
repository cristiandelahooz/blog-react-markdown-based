import { useTocStore } from '@/stores/toc'
import React, { useEffect, useRef } from 'react'

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>

export const createRehypeHeading = (level: number) => {
  const RehypeHeading = (props: Props) => {
    const { id, children } = props
    const refHeading = useRef<HTMLHeadingElement>(null)
    const registerHeading = useTocStore(state => state.registerHeading)

    const HeadingTag = `h${level || 1}` as
      | 'h1'
      | 'h2'
      | 'h3'
      | 'h4'
      | 'h5'
      | 'h6'

    useEffect(() => {
      if (id)
        registerHeading(id, refHeading as React.RefObject<HTMLHeadingElement>)
    }, [id, registerHeading])

    return (
      <HeadingTag ref={refHeading} id={id}>
        {children}
      </HeadingTag>
    )
  }
  return (props: Props) => <RehypeHeading {...props} />
}
