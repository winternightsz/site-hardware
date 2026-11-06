import { Link } from 'react-router'
import { site } from '../data/site'

export function EvaluationCallout() {
  return <aside className="evaluation-callout" aria-label={site.evaluation}>
    <h2>{site.evaluationCalloutTitle}</h2>
    <p>{site.evaluationVoluntary}</p>
    <Link className="button button-secondary" to="/avaliacao">{site.evaluationCalloutAction}<span aria-hidden="true">→</span></Link>
  </aside>
}
