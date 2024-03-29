let depId = 0;
let watcherId = 0;

class Dep {
    constructor() {
        this.id = ++depId;
        this.subs = [];
    }

    addSub(watcher) {
        this.subs.push(watcher);
    }

    depend(){
        Dep.target.addDep(this);
    }

    notify() {
        this.subs.forEach(watcher =>{
            //依赖更新视图
            // console.log('更新所有依赖对应视图');
            watcher.update();
        })
    }
}
Dep.target = null;

class Watcher {
    constructor (vm,expOrFunc,cb) {
        this.vm = vm;
        this.exp = expOrFunc;
        this.getter = function(vm, exp){
            let exprArr = exp.split('.');
            let value = exprArr.reduce((prev,next) => {
                return prev[next];
            }, vm.$data)
            return value;
        };
        this.id = ++watcherId;
        this.cb = cb;
        this.deps = [];
        this.value = this.get(); //获取老值
    }

    get(){
        Dep.target = this;
        let value = this.getter(this.vm,this.exp);
        Dep.target = null;
        return value;
    }

    addDep(dep){
        if(this.deps.indexOf(dep.id) === -1){
            this.deps.push(dep.id);
            dep.addSub(this);
        }
    }

    //对外暴露的方法
    update(){
        let value = this.get(); //新值
        if(this.value !== value || this.deep || typeof value === 'object') {
            const oldValue = this.value;
            this.value = value;
            this.cb.call(this.vm,value,oldValue);
        }
    }
}

function defineReactive (obj,key,value) {
    const dep = new Dep();
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get () {
            if(Dep.target){
                dep.depend();
            }
            return value;
        },
        set (newValue) {
            if(value !== newValue) {
                value = newValue;
                dep.notify();
            }
        }
    })
}

function observer(obj) {
    Object.keys(obj).forEach((key) => {
        defineReactive(obj,key,obj[key]);
        if(typeof obj[key] === 'object') {
            observer(obj[key]);
        }
    })
}

/* class Vue{
    constructor(options) {
        this._data = options.data;
        observer(this._data);
        if(options.watch) {
            Object.keys(options.watch).forEach((key)=>{
                const watcher = new Watcher(this,key,options.watch[key]);
            })
        }
    }
}

let o = new Vue({
    data: {
        a: 5,
        b: 'test'
    },
    watch: {
        'a': function(newValue){
            console.log("update:"+newValue);
        }
    }
});

// console.log(o._data.a);
o._data.a = 20;
console.log(o._data.a); */