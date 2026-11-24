import type { ReactNode, MouseEvent } from 'react'
import { useHref, useLocation } from 'react-router'

// O hash externo pertence ao HashRouter; o clique não altera o endereço da rota.
export function SectionLink({ targetId, children, className }: {
  targetId: string
  children: ReactNode
  className?: string
}) {
  const { pathname, search } = useLocation()
  const href = useHref({ pathname, search, hash: '#' + targetId })
  function scrollToSection(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const target = document.getElementById(targetId)
    if (!target) return
    event.preventDefault()
    target.focus({ preventScroll: true })
    target.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    })
  }
  return <a href={href} aria-controls={targetId} className={className} onClick={scrollToSection}>{children}</a>
}
