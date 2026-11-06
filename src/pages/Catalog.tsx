import { ComponentCard } from '../components/ComponentCard'
import { categorias, componentes } from '../data/componentes'
import { site } from '../data/site'

export function Catalog() {
  return <div className="container page-space">
    <div className="page-intro">
      <p className="eyebrow">{site.eyebrow}</p>
      <h1>{site.catalogTitle}</h1><p className="lead">{site.catalogDescription}</p>
      <div className="category-links">{categorias.map(category =>
        <a key={category.id} href={'#' + category.id}>{category.titulo}<span aria-hidden="true">↓</span></a>
      )}</div>
    </div>
    {categorias.map(category => <section id={category.id} key={category.id} className="catalog-section" aria-labelledby={category.id + '-titulo'}>
      <div className="section-heading"><div><h2 id={category.id + '-titulo'}>{category.titulo}</h2><p>{category.descricao}</p></div></div>
      <div className="cards-grid">{componentes.filter(item => item.categoria === category.id).map(item =>
        <ComponentCard key={item.slug} componente={item} />
      )}</div>
    </section>)}
  </div>
}
