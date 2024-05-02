import esbuild from 'rollup-plugin-esbuild'
export default {
  plugins: [
    esbuild ({ // 所有选项都是可选的
      include: /\.[jt]sx?$/, // default
      exclude: /node_modules/, // default
      watch: process.argv.includes ('- -watch'),
      minify: process.env.NODE_ENV === 'production',
      target: 'es2017', // default, or 'es20XX', 'esnext'
      define: { __VERSION__: '"xyz"' },
    })],
}
