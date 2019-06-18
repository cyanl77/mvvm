class Compile {
    constructor (el,vm) {
        let fragment = document.createDocumentFragment();
        let nodes = el.childNodes;
        this.el = el;
        this.vm = vm;
        console.log(nodes);

        //将document中的节点移动到fragment中处理
        //由于childnodes被加入fragment一个时就自动少一个，不能用foreach来加入fragment, foreach内部计数对元素进行执行。
        //childNodes只返回第一层节点
        while(nodes.length > 0) {
            fragment.appendChild(nodes[0]);
        }

        //在模板中解析vue相关模板
        this.compileFragment(fragment);
        this.el.appendChild(fragment);
    }

    //辅助方法
    isDirection(attr) {
        return attr.includes('v-');
    }


    //核心方法

    //遇到element node需要继续遍历其子节点故需要递归
    compileFragment(fragment) {
        let vNodes = fragment.childNodes;
        Array.from(vNodes).forEach( vNode => {
            if(vNode.nodeType === 1) {
                console.log(vNode)
                this.compileElementNode(vNode);
                this.compileFragment(vNode);
            } else if(vNode.nodeType === 3) { //这特么怎么写的，回车咋处理？哦textContent
                console.log(vNode)
                this.compileTextNode(vNode);
            }
        });
    }

    compileElementNode(node) {
        let vAttrs = node.attributes; //这里返回的是属性节点集合,集合没有继承forEach
        Array.from(vAttrs).forEach(attr => { //类数组集合转数组
            let attrName = attr.name;
            if(this.isDirection(attrName)) {
                let [,type] = attrName.split('-'),
                    expr = attr.value;
                UpdateUtil[type](this.vm, node, expr);
            }
        })
    }

    compileTextNode(node) {
        UpdateUtil['text'](this.vm, node, node.textContent);
    }
}


//将新值更新在视图层上
const UpdateUtil = {
    model (vm, node, expr) {
        let update = this.updater['modelUpdater'];
        new Watcher(vm, expr, (newValue) => {
            update && update(node, this.getValue(vm, expr));
        });

        update && update(node, this.getValue(vm, expr));
    },

    text (vm, node, expr) {
        let update = this.updater['modelUpdater'];

        //注意: expr可能为{{a}}{{b}},故需用replace方法
        //这里相当于给a,b分别绑定watcher,并且对应一个文本节点
        expr.replace(/\{\{([^}])+}\}/g, (...args) => {
            new Watcher(vm, args[1], () => {
                update && update(node, this.getTextValue(vm, expr));
            });
        })

        update && update(node, this.getTextValue(vm, expr));
    },

    getValue (vm, expr) {
        let exprArr = expr.split('.');
        let value = exprArr.reduce((accumulator, currentValue) => {
            return accumulator[currentValue];
        },vm.$data)
        console.log(value);
        return value;
    },
    getTextValue (vm, expr) {
        //注意这里的骚操作：在replace的回调中计算匹配到子串的值并替换，一气呵成
        return expr.replace(/\{\{([^\}]+)\}\}/g, (...args) => { //参数：match, p1
            return this.getValue(vm, args[1]);
        });
    },
    updater: {
        modelUpdater (node, value) {
            node.value = value;
        },
        textUpdater (node, value) {
            node.textContent = value;
        }
    }

}