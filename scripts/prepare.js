const path = require('node:path')
const fs = require('fs-extra')
const iconify = require('@iconify-json/ep')

async function prepare() {
  const outputDir = path.resolve(process.cwd(), 'public/icons')
  await fs.ensureDir(outputDir)
  await fs.emptyDir(outputDir)
  await fs.writeJSON(
    path.resolve(outputDir, 'icons.json'),
    iconify.icons,
  )
}

prepare()
