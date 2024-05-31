import banner from 'vite-plugin-banner'

export default function createBanner() {
  return banner(`
/**
 * 由 flying services 提供技术支持
 * Powered by Hector
 */
  `)
}
