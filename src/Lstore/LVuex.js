// 实现一个store类
let Vue

class Store {
    constructor(options) {
        // 保存配置
        this.$options = options
        this._wrappedGetters = options.getters

        // 定义computed
        const computed = {}
        // 给Store绑定属性getters
        this.getters = {}
        // 保存this，因为后面的函数中this指向会变化
        const _this = this
        // 循环获取this.$optios.getters对象的key键值对
        Object.keys(this._wrappedGetters).forEach(key => {
            // 取出getters中 doubleCounter(state) {} 等属性
            const fn = _this._wrappedGetters[key]
            // 转换为computed可以使用的无参形式
            computed[key] = function () {
                return fn(_this.state)
            }
            // 为getters 设置只读属性
            Object.defineProperty(_this.getters, key, {
                get: () => _this._vm[key]
            })
        })

        // 对state做响应式处理
        // Vue初始化的时候会对data做响应式处理
        // 同时还会对data做代理，data中的响应式属性会被代理到Vue上
        // 所以要做封装  把他藏起来
        this._vm = new Vue({
            data: {
                $$state: options.state    // 加上两个$，就不会被代理
            },
            computed
        })

        //绑定上下文
        this.commit = this.commit.bind(this)
        this.dispatch = this.dispatch.bind(this)
    }

    // 获取  get
    get state() {
        return this._vm._data.$$state
    }

    set state(err) {
        console.error('请不要直接set，请使用replaceState()重置')
    }

    //实现变更 commit 方法
    commit(type, payload){
        const fn = this.$options.mutations[type]
        if(!fn){
            console.error('mutations不存在')
            return
        }

        fn(this.state, payload)
    }


    //实现变更 dispatch 方法
    dispatch(type, payload){
        const fn = this.$options.actions[type]
        if(!fn){
            console.error('actions不存在')
            return
        }

        fn(this, payload)
    }

}

// 挂载实例$Store
function install(_Vue) {
    Vue = _Vue

    Vue.mixin({
        beforeCreate() {
            if(this.$options.store){
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}

export default { Store, install }


