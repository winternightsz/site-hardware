
import { Link } from 'react-router'
import { site } from '../data/site'
import { EvaluationCallout } from '../components/EvaluationCallout'
import { assetUrl } from '../utils/assetUrl'

export function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span aria-hidden="true" />
              {site.eyebrow}
            </p>

            <h1>{site.title}</h1>
            <p className="lead">{site.introduction}</p>

            <Link
              to="/componentes"
              className="button button-primary"
            >
              {site.explore}
              <span aria-hidden="true">→</span>
            </Link>

            <p className="hero-footnote">
              {site.componentCount}
            </p>
          </div>

          <figure className="hero-visual">
            <div className="visual-heading">
              <span
                className="visual-dot"
                aria-hidden="true"
              />
              {site.heroLabel}
            </div>

            <div className="hero-computer">
              <img
                src={assetUrl('/imagens/monitor.svg')}
                alt=""
                width="420"
                height="280"
              />
              <span className="visual-tag">
                {site.heroMonitor}
              </span>
            </div>

            <div className="hero-pieces">
              <div>
                <img
                  src={assetUrl('/imagens/processador.svg')}
                  alt=""
                  width="420"
                  height="280"
                />
                <span>{site.heroProcessor}</span>
              </div>

              <div>
                <img
                  src={assetUrl('/imagens/memoria-ram.svg')}
                  alt=""
                  width="420"
                  height="280"
                />
                <span>{site.heroRam}</span>
              </div>
            </div>

            <figcaption>{site.heroCaption}</figcaption>
          </figure>
        </div>
      </section>

      <section
        className="container learning-section"
        aria-labelledby="como-aprender"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              {site.homeStepsTitle}
            </p>
            <h2 id="como-aprender">
              {site.homeStepsDescription}
            </h2>
          </div>
        </div>

        <ol className="steps-grid">
          {site.steps.map(step => (
            <li key={step.number}>
              <span
                className="step-number"
                aria-hidden="true"
              >
                {step.number}
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="container about-section"
        aria-labelledby="sobre"
      >
        <div>
          <p className="eyebrow">{site.project}</p>
          <h2 id="sobre">{site.homeNoteTitle}</h2>
          <p>{site.projectDescription}</p>
        </div>

        <div className="about-note">
          <p>{site.homeNote}</p>

          <Link
            className="text-link"
            to="/componentes"
          >
            {site.explore}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <div className="container home-evaluation">
        <EvaluationCallout />
      </div>
    </>
  )
}
