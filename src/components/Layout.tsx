import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { componentes } from '../data/componentes'
import { site } from '../data/site'

function Navigation() {
  return <nav aria-label={site.navigation} className="navigation">
    <NavLink end to="/">{site.home}</NavLink>
    <NavLink to="/componentes">{site.catalog}</NavLink>
    <NavLink to="/avaliacao">{site.evaluation}</NavLink>
  </nav>
}

export function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const normalizedPath = pathname.replace(/\/+$/, '') || '/'
  const previousPath = useRef(pathname)
  useEffect(() => {
    const component = componentes.find(item => normalizedPath === '/componentes/' + item.slug)
    const title = component?.nome ?? (
      normalizedPath === '/' ? site.home : normalizedPath === '/componentes' ? site.catalog :
        normalizedPath === '/avaliacao' ? site.evaluation : site.notFoundTitle
    )
    document.title = title + ' | ' + site.name
    // Preserve a ordem de Tab na primeira visita; mova o foco só entre páginas.
    if (previousPath.current !== pathname) {
      document.getElementById('conteudo')?.focus({ preventScroll: true })
      window.scrollTo(0, 0)
      previousPath.current = pathname
    }
  }, [pathname, normalizedPath])

  return <>
    <a className="skip-link" href="#conteudo">{site.skip}</a>
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" to="/" aria-label={site.name}>
          <span className="brand-mark" aria-hidden="true"><span /><span /><span /><span /></span>
          <span>{site.brandTop}<strong>{site.brandBottom}</strong></span>
        </Link>
        <Navigation />
      </div>
    </header>
    <main id="conteudo" tabIndex={-1}>{children}</main>
    <footer className="site-footer">
      <div className="container footer-inner">
        <div><p className="footer-title">{site.name}</p><p>{site.footer}</p></div>
        <div><p className="footer-title">{site.project}</p><p>{site.footerNote}</p></div>
      </div>
    </footer>
  </>
}
