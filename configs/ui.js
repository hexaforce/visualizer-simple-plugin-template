import path from 'path'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import pkg from '../package.json' with { type: 'json' }

const extensionName = process.env.EXTENSION_NAME
const uiName = process.env.UI_NAME

if (!extensionName || !uiName) {
  throw new Error('❌ EXTENSION_NAME and UI_NAME must be set.')
}

const rootDir = path.resolve(__dirname, '..')
const extensionRoot = path.join(rootDir, 'src/extensions', extensionName, uiName)
const outDir = path.join(rootDir, 'dist-ui', extensionName, uiName)

function serverHeadersPlugin() {
  return {
    name: 'server-headers',
    configureServer(server) {
      server.middlewares.use((_req, res, next) => {
        res.setHeader('Service-Worker-Allowed', '/')
        next()
      })
    },
  }
}

export default defineConfig({
  root: extensionRoot,
  appType: 'spa',
  publicDir: false,
  define: {
    'process.env.VERSION': JSON.stringify(pkg.version),
  },
  plugins: [serverHeadersPlugin(), viteSingleFile()],
  build: {
    outDir,
    emptyOutDir: false,
  },
  resolve: {
    alias: {
      '@': path.join(rootDir, 'src'),
    },
  },
})
