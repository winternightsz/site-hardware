
export function assetUrl(path: string): string {
  // Mantém URLs externas e imagens embutidas.
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(path)) {
    return path
  }

  const base = import.meta.env.BASE_URL

  // Evita duplicar o caminho base.
  if (base !== '/' && path.startsWith(base)) {
    return path
  }

  // Remove a barra inicial e aplica a base do Vite.
  return `${base}${path.replace(/^\/+/, '')}`
}
