import viteConfig from '../../vite.config'

export const basePath = viteConfig.base ?? '/'
export const appUrl = (route: string) => './#' + route
export const publicUrl = (path: string) => basePath + path.replace(/^\/+/, '')
