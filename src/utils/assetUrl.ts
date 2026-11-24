
export function assetUrl(path: string, base = import.meta.env.BASE_URL): string {
  if (!path) return path
  // Mantém URLs externas e imagens embutidas.
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(path)) {
    return path
  }

  const prefix = base.endsWith('/') ? base : base + '/'
  const relativePath = path.replace(/^(?:\.\/)+/, '').replace(/^\/+/, '')
  // Também aceita caminhos já resolvidos sem a barra inicial.
  const relativeBase = prefix.replace(/^\/+/, '')
  if (relativeBase && relativePath.startsWith(relativeBase)) return '/' + relativePath
  return prefix + relativePath
}
