class Observer {
	constructor(data) {
		this.walk(data)
	}

	walk(data) {
		if (!data || typeof data !== 'object') {
			return
		}

		Object.keys(data).forEach(key => {
			this.defineReactive(data, key, data[key])
		})
	}

	defineReactive(obj, key, val) {
		let that = this
		let dep = new Dep()

		//如果val是对象，把val内部的属性转换成响应式数据
		this.walk(val)
		Object.defineProperty(obj, key, {
			enumerable: true,
			configurable: true,
			get() {
				Dep.target && dep.addSub(Dep.target)
				return val
			},
			set(newValue) {
				if (newValue === val) {
					return
				}
				val = newValue
				that.walk(newValue)
				//发送通知
				dep.notify()
			}
		})
	}
}