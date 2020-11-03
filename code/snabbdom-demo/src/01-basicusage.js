import { h, init } from 'snabbdom'

//1.hello world
//参数：数组，模块
//返回值：patch函数，作用对比两个vnode的差异更新到真实dom
let patch = init([])

//参数1：标签+选择器
//参数2：如果是字符串的话就是标签中的内容
let vnode = h('div#container.cls', 'Hello World')

let app = document.querySelector('#app')

//参数1：可以是dom元素，内容会把dom元素转换成vnode
//参数2：vnode
//返回值：vnode
let oldVnode = patch(app, vnode)
patch(oldVnode, vnode)