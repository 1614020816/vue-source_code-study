let Vue 
// 新建一个类，构造router函数
class LVueRoute {
    constructor (options) {
        this.$options = options

        // 1.保存当前的hash值到current中
        // current 必须是响应式数据
        Vue.util.defineReactive(this, 'current', '/')

        // 2.监听hash值的变化
        window.addEventListener('hashchange', () => {
            //获取的是url中#后面的部分
            this.current = window.location.hash.slice(1)
        })
    }
}

// 新建两个组件 router-link、router-view
// 插件实现：install 在 use 的时候会被调用
LVueRoute.install = function(_Vue) {

    // 保存一次构造函数
    Vue = _Vue

    // this.$router 挂载在 Vue 原型上
    // 参数1是Vue的构造函数
    Vue.mixin({
        beforeCreate() {
            // this指的是组件实例
            if(this.$options.router){
                Vue.prototype.$router = this.$options.router
            }
        }
    })

    // 实现两个全局的组件 router-link、router-view

    Vue.component('router-link', {
        // 要实现的目标 <a href="abc">abc</a>
        // 展示为 <router-link to="/abc">abc</router-link>
        // 要是用render函数渲染
        props: {
            to: {
                type: String,
                required: true
            }
        },
        render(h) {
            return h('a', {attrs: {href: '#' + this.to}}, this.$slots.default)
        }
    })

    Vue.component('router-view', {
        // 获取index.js下的路由组件名
        // 要是用render函数渲染
        render(h) {
            // 1.获取component
            const current = this.$router.current

            let component = null

            const route = this.$router.$options.routes.find((route) => {
                return route.path === current
            })

            // 设置路由的选项并且渲染
            if(route){
                component = route.component
            }

            return h(component)
        }
    })

}


export default LVueRoute
