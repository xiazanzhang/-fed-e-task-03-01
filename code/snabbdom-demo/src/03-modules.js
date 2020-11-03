//1.导入模块
import { init, h } from 'snabbdom'
import style from 'snabbdom/modules/style'
import eventlisteners from 'snabbdom/modules/eventlisteners'
//2.注册模块
let patch = init([
  style,
  eventlisteners
])
//3.使用h()函数的第二个参数导入传入模块需要的数据（对象）
let vnode = h('div', {
  style: {
    backgroundColor: 'red'
  },
  on: {
    click: eventHandler
  }
}, [
  h('h1', 'Hello Snabbdom'),
  h('p', '这是p标签')
])

let app = document.querySelector('#app')
patch(app, vnode)

function eventHandler() {
  console.log('我被点击了')
}