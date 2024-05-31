import { relative } from 'path'
import { readdirSync, lstatSync } from 'fs'

function getFolder(path) {
  const components = []
  const files = readdirSync(path)
  files.forEach((item) => {
    const stat = lstatSync(`${path}/${item}`)
    if (stat.isDirectory() === true && item !== 'components') {
      components.push(`${path}/${item}`)
      components.push(...getFolder(`${path}/${item}`))
    }
  })
  return components
}

export const description = '创建页面'
export const prompts = [
  {
    type: 'list',
    name: 'path',
    message: '请选择页面创建目录',
    choices: getFolder('src/views')
  },
  {
    type: 'input',
    name: 'name',
    message: '请输入文件名',
    validate: (v) => {
      if (!v || v.trim === '') {
        return '文件名不能为空'
      } else {
        return true
      }
    }
  }
]
export function actions(data) {
  const relativePath = relative('src/views', data.path)
  const actions = [
    {
      type: 'add',
      path: `${data.path}/{{dotCase name}}.vue`,
      templateFile: 'plop-templates/page/index.hbs',
      data: {
        componentName: `${relativePath} ${data.name}`
      }
    }
  ]
  return actions
}

export default { getFolder, description, prompts, actions }
