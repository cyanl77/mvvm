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
                // this.compileElementNode(vNode);
                // this.compileFragment(vNode);
            } else if(vNode.nodeType === 3) { //这特么怎么写的，回车咋处理？textContent
                console.log(vNode)
                // this.compileTextNode(vNode);
            }
        });
    }

    compileElementNode(node) {
        let vAttrs = node.attributes; //这里返回的是属性节点集合,集合没有继承forEach
        Array.from(vAttrs).forEach(attr => { //类数组集合转数组
            let attrName = attr.name;
            if(this.isDirection(attrName)) {
                let [,type] = attrName.split('-'),
                    expr = attr.value,
                    value = this.getValue(this.vm, expr);
                Updater[type](node, value);
            }
        })
    }

    compileTextNode(node) {
        let reg = /\{\{([^\}]+)\}\}/g;
        let expr = node.textContent.replace(reg,'$1');
        let value = this.getValue(this.vm, expr);
        Updater['text'](node, value);
    }

    getValue (vm, expr) {
        return vm.$data[expr];
    }
}

const Updater = {
    model (node, value) {
        node.value = value;
    },
    text (node, value) {
        node.textContent = value;
    }
}