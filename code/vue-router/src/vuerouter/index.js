let _Vue = null

export default class VueRouter {
  constructor(options) {
    this.options = options
    this.routeMap = {}
    this.data = _Vue.observable({
      current: '/'
    })
  }

  static install(Vue) {
    //1.判断当前插件是否已经被安装
    if (VueRouter.install.installed) {
      return
    }
    VueRouter.install.installed = true
    //2.把Vue构造函数记录到全局变量
    _Vue = Vue
    //3.把创建Vue实例时候传入的router对象注入到Vue实例上
    _Vue.mixin({
      beforeCreate() {
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router
          this.$options.router.init()
        }
      }
    })
  }

  init() {
    this.createRouteMap()
    this.initComponent(_Vue)
    this.initEvent()
  }

  createRouteMap() {
    //遍历所有的路由规则，把路由规则解析成键值对的形式，存储到routeMap中
    this.options.routes.forEach(route => {
      this.routeMap[route.path] = route.component
    })
  }

  initComponent(Vue) {
    Vue.component("router-link", {
      props: {
        to: String
      },
      render(h) {
        return h("a", {
          attrs: {
            href: this.to
          },
          on: {
            click: this.clickhander
          }
        }, [this.$slots.default])
      },
      methods: {
        clickhander(e) {
          history.pushState({}, "", this.to)
          this.$router.data.current = this.to
          e.preventDefault()
        }
      }
      // template:"<a :href='to'><slot></slot><>"
    })
    const self = this
    Vue.component("router-view", {
      render(h) {
        // self.data.current
        const cm = self.routeMap[self.data.current]
        return h(cm)
      }
    })

  }
  initEvent() {
    //
    window.addEventListener("popstate", () => {
      this.data.current = window.location.pathname
    })
  }
}