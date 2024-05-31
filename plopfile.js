import viewGenerator from './plop-templates/page/prompt.js'
import componentGenerator from './plop-templates/component/prompt.js'
import storeGenerator from './plop-templates/store/prompt.js'

export default function (plop) {
  plop.setGenerator('view', viewGenerator)
  plop.setGenerator('component', componentGenerator)
  plop.setGenerator('store', storeGenerator)
}
