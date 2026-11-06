export function getGoogleFormsLinks(value: string): { responseUrl: string; embedUrl: string } | null {
  try {
    const url = new URL(value.trim())
    if (url.protocol !== 'https:' || url.hostname !== 'docs.google.com' ||
      url.port || url.username || url.password ||
      !/^\/forms\/d\/(?:e\/)?[a-zA-Z0-9_-]+\/viewform\/?$/.test(url.pathname)) return null
    // Remove parâmetros de rastreamento, pré-preenchimento e fragmentos.
    const responseUrl = url.origin + url.pathname.replace(/\/$/, '')
    return { responseUrl, embedUrl: responseUrl + '?embedded=true' }
  } catch {
    return null
  }
}
