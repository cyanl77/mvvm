let depId = 0;
let watcherId = 0;

class Dep {
    constructor () {
        this.id = ++depId;
        this.subs = [];
    }

    addSub(watcher) {
        // console.log("collect dependencies");
        this.subs.push(watcher);
    }

    depend() {
        Dep.target.addDep(this);
    }

    notify(){
        //通知所有依赖更新
        // console.log("update all dependencies.");
        this.subs.forEach((watcher)=>{
            //依赖更新视图
            // console.log('更新所有依赖对应视图');
            watcher.update();
        })
    }
}
Dep.target = null;


class Watcher {
    constructor(vm,exp,cb){
        this.vm = vm;
        this.exp = exp;
        this.cb = cb;
        this.deps = [];
        this.getter = function(vm,exp){
            return vm._data[exp];
        };
        this.id = ++watcherId;
        this.value = this.get();
    }

    get () {
        Dep.target = this;
        var value = this.getter.call(this.vm,this.vm,this.exp);
        Dep.target = null;
        return value;
    }

    addDep (dep) {
        if(this.deps.indexOf(dep.id) === -1) {
            this.deps.push(dep.id);
            dep.addSub(this);
        }
    }

    update() {
        let value = this.get();
        if(this.value !== value || this.deep || typeof value === 'object') {
            const oldValue = this.value;
            this.value = value;
            this.cb.call(this.vm,value,oldValue);
        }
    }
}

/* 将一个属性响应式化 */
function defineReactive(obj,key,value){
    const dep = new Dep();
    Object.defineProperty(obj,key,{
        enumerable: true,
        configurable: true,
        get () {
            if(Dep.target){
                dep.depend();
                console.log(dep.subs);
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
    Object.keys(obj).forEach((key)=>{
        defineReactive(obj,key,obj[key]);
    })
}

class Vue {
    constructor(options){
        this._data = options.data;
        observer(this._data);
        if(options.watch) {
            Object.keys(this._data).forEach((key)=>{
                const watcher = new Watcher(this,key,options.watch[key]);
            })
        }
    }
}

let o = new Vue({
    data: {
        a: 10
    },
    watch: {
        'a': function (newValue) {
            console.log("update a:"+newValue)
        },
        'b': function (newValue) {
            console.log("update b:"+newValue)
        }
    }
})

// var aValue = o._data.a;
o._data.a = 20;
