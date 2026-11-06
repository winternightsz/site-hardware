import { Link, useParams } from 'react-router'
import { categorias, componentes } from '../data/componentes'
import { site } from '../data/site'
import { NotFound } from './NotFound'
import { EvaluationCallout } from '../components/EvaluationCallout'

export function Detail() {
  const { slug } = useParams()
  const index = componentes.findIndex(item => item.slug === slug)
  if (index === -1) return <NotFound />
  const componente = componentes[index]
  const next = componentes[(index + 1) % componentes.length]
  return <article className="container detail-page page-space">
    <Link to="/componentes" className="text-link back-link"><span aria-hidden="true">←</span> {site.backToList}</Link>
    <header className="detail-heading">
      <p className="eyebrow">{categorias.find(category => category.id === componente.categoria)?.titulo}</p>
      <h1>{componente.nome}</h1>
      <p className="lead">{componente.resumo}</p>
    </header>
    <figure className="detail-figure">
      <img src={componente.imagem} alt={componente.alt} width="420" height="280" />
      <figcaption>{site.illustrationCaption}</figcaption>
    </figure>
    <div className="detail-reading">
      <section className="analogy-box" aria-labelledby="analogia">
        <span className="section-number" aria-hidden="true">01</span>
        <h2 id="analogia">{site.imagine}</h2>
        <p className="analogy-text">{componente.analogia}</p>
        <p className="analogy-limit">{componente.limiteAnalogia}</p>
      </section>
      <section className="explanation-section" aria-labelledby="funcao">
        <span className="section-number" aria-hidden="true">02</span>
        <h2 id="funcao">{site.purpose}</h2><p>{componente.explicacao}</p>
        <aside className="example-box"><h3>{site.example}</h3><p>{componente.exemplo}</p></aside>
      </section>
      {componente.pontosComplementares.length > 0 && <section className="more-section" aria-labelledby="mais">
        <span className="section-number" aria-hidden="true">03</span>
        <h2 id="mais">{site.more}</h2>
        <ul>{componente.pontosComplementares.map(point => <li key={point}>{point}</li>)}</ul>
      </section>}
      <nav className="detail-navigation" aria-label={site.catalog}>
        <Link className="button button-secondary" to="/componentes"><span aria-hidden="true">←</span>{site.backToList}</Link>
        <Link className="button button-primary next-component" to={'/componentes/' + next.slug}>
          <span><small>{site.next}</small>{next.nome}</span><span aria-hidden="true">→</span>
        </Link>
      </nav>
      <EvaluationCallout />
    </div>
  </article>
}
