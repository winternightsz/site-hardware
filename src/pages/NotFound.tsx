import { Link } from 'react-router'
import { site } from '../data/site'
export function NotFound() {
  return <div className="container page-space not-found">
    <p className="eyebrow">{site.notFoundLabel}</p>
    <span className="error-number" aria-hidden="true">404</span>
    <h1>{site.notFoundTitle}</h1><p className="lead">{site.notFoundText}</p>
    <div className="error-actions"><Link className="button button-primary" to="/componentes">{site.explore}</Link>
      <Link className="button button-secondary" to="/">{site.back}</Link></div>
  </div>
}
