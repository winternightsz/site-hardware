import { Link } from 'react-router'
import type { Componente } from '../data/componentes'
import { site } from '../data/site'
import { assetUrl } from '../utils/assetUrl'

export function ComponentCard({
  componente,
}: {
  componente: Componente
}) {
  return (
    <article className="component-card">
      <Link
        to={'/componentes/' + componente.slug}
        className="card-link"
      >
        <div className="card-image">
          <img
            src={assetUrl(componente.imagem)}
            alt={componente.alt}
            width="420"
            height="280"
            loading="lazy"
          />
        </div>

        <div className="card-content">
          <h3>{componente.nome}</h3>
          <p>{componente.resumo}</p>

          <span className="card-action">
            {site.cardAction}
            <span aria-hidden="true">↗</span>
          </span>
        </div>
      </Link>
    </article>
  )
}
