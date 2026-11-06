import { Link } from 'react-router'
import { googleFormsUrl } from '../config/site'
import { getGoogleFormsLinks } from '../lib/googleForms'
import { site } from '../data/site'

export function Evaluation() {
  const links = getGoogleFormsLinks(googleFormsUrl)
  return <div className="container page-space evaluation-page">
    <p className="eyebrow">{site.evaluation}</p>
    <h1>{site.evaluationTitle}</h1><p className="lead">{site.evaluationIntro}</p>
    <p className="evaluation-voluntary">{site.evaluationVoluntary}</p>
    {links ? <section className="form-panel" aria-labelledby="formulario-titulo">
      <h2 id="formulario-titulo">{site.evaluationFormTitle}</h2>
      <p className="privacy-note">{site.evaluationGoogleNotice}</p>
      <a className="button button-primary" href={links.responseUrl} target="_blank" rel="noopener noreferrer">
        {site.evaluationOpen}<span aria-hidden="true">↗</span>
      </a>
      <p className="form-help">{site.evaluationFallback}</p>
      <iframe className="google-form" src={links.embedUrl} title={site.evaluationFrameTitle}
        width="100%" height="1600" loading="lazy" referrerPolicy="no-referrer" />
    </section> : <section className="pending-panel" aria-labelledby="avaliacao-status">
      <span className="pending-icon" aria-hidden="true">…</span>
      <h2 id="avaliacao-status">{site.evaluationStatus}</h2>
      <p>{site.evaluationPending}</p><p className="privacy-note">{site.evaluationPrivacy}</p>
      <Link to="/componentes" className="button button-primary">{site.explore}<span aria-hidden="true">→</span></Link>
    </section>}
  </div>
}
