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

export const description = '创建组件'
export const prompts = [
  {
    type: 'confirm',
    name: 'isGlobal',
    message: '是否为全局组件',
    default: false
  },
  {
    type: 'list',
    name: 'path',
    message: '请选择组件创建目录',
    choices: getFolder('src/components'),
    when: (answers) => {
      return !answers.isGlobal
    }
  },
  {
    type: 'input',
    name: 'name',
    message: '请输入组件名称',
    validate: (v) => {
      if (!v || v.trim === '') {
        return '组件名称不能为空'
      } else {
        return true
      }
    }
  }
]
export function actions(data) {
  let path = ''
  if (data.isGlobal) {
    path = 'src/components/{{properCase name}}/index.vue'
  } else {
    path = `${data.path}/components/{{properCase name}}/index.vue`
  }
  const actions = [
    {
      type: 'add',
      path,
      templateFile: 'plop-templates/component/index.hbs'
    }
  ]
  return actions
}

export default { getFolder, description, prompts, actions }
