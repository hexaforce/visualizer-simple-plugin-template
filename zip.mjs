import fs from 'fs'
import path from 'path'
import archiver from 'archiver'
import Yml from 'yml'

const rootDir = path.resolve('.')
const sourceDir = path.resolve('dist')
const outputDir = path.resolve('package')

async function zipDirectory(sourceDir, outPath) {
  const archive = archiver('zip', { zlib: { level: 9 } })
  const stream = fs.createWriteStream(outPath)

  return new Promise((resolve, reject) => {
    archive.directory(sourceDir, false).on('error', reject).pipe(stream)

    stream.on('close', resolve)
    archive.finalize()
  })
}

function copy(fileName) {
  let from = path.join(rootDir, fileName)
  let to = path.join(sourceDir, fileName)
  if (fs.existsSync(from)) {
    fs.copyFileSync(from, to)
    return true
  }
  return false
}

async function main() {
  try {
    const reearthYml = Yml.load(path.join(rootDir, 'public', 'reearth.yml'))
    const filename = `${reearthYml.id}-${reearthYml.version}.zip`
    const outputPath = path.join(outputDir, filename)

    await fs.promises.mkdir(outputDir, { recursive: true })

    if (!copy('README.md')) {
      console.error(`❌ README.md not found`)
      return
    }
    if (!copy('LICENSE')) {
      console.error(`❌ LICENSE not found`)
      return
    }

    await zipDirectory(sourceDir, outputPath)
    console.log(`✅ Zipped ${sourceDir} → ${outputPath}`)
  } catch (error) {
    console.error(`❌ Error during zip process: ${error.message}`)
  }
}

main()
