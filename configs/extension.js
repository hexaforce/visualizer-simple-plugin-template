import path from 'path'
import fg from 'fast-glob'
import { defineConfig } from 'vite'

const extensionName = process.env.EXTENSION_NAME
if (!extensionName) {
  throw new Error('❌ EXTENSION_NAME must be set.')
}

const rootDir = path.resolve(__dirname, '..')
const srcDir = path.join(rootDir, 'src/extensions', extensionName)
const outDir = path.join(rootDir, 'dist')
const distUiAlias = path.join(rootDir, 'dist-ui')

function watchPublicFilesPlugin() {
  return {
    name: 'watch-external',
    async buildStart() {
      const files = await fg(['public/**/*'])
      files.forEach((file) => this.addWatchFile(file))
    },
  }
}

export default defineConfig({
  plugins: [watchPublicFilesPlugin()],
  build: {
    outDir,
    emptyOutDir: false,
    lib: {
      formats: ['iife'],
      entry: path.join(srcDir, `${extensionName}.js`),
      name: extensionName,
      fileName: () => `${extensionName}.js`,
    },
  },
  resolve: {
    alias: {
      '@distui': distUiAlias,
    },
  },
})
