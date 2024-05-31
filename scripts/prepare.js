import { resolve } from 'node:path'
import { ensureDir, emptyDir, writeJson } from 'fs-extra/esm'
import { icons } from '@iconify-json/ep'

async function prepare() {
  // eslint-disable-next-line no-undef
  const outputDir = resolve(process.cwd(), 'public/icons')
  await ensureDir(outputDir)
  await emptyDir(outputDir)
  await writeJson(resolve(outputDir, 'icons.json'), icons)
}

prepare()
