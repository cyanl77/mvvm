class Compile {
    constructor (el,vm) {
        let fragment = document.createDocumentFragment();
        let nodes = el.childNodes;
        this.vm = vm;
        console.log(nodes);

        //将document中的节点移动到fragment中处理
        //由于childnodes被加入fragment一个时就自动少一个，不能用foreach来加入fragment, foreach内部计数对元素进行执行。
        //childNodes只返回第一层节点
        while(nodes.length > 0) {
            fragment.appendChild(nodes[0]);
        }

        //在模板中解析vue相关模板
        this.compileFragment(fragment)
    }

    //辅助方法
    isDirection(attr) {
        return attr.indexOf('v-') === 0;
    }

    //核心方法

    //遇到element node需要继续遍历其子节点故需要递归
    compileFragment(fragment) {
        let vNodes = fragment.childNodes;
        console.log(vNodes.forEach);
        Array.from(vNodes).forEach( vNode => {
            if(vNode.nodeType === 1) {
                this.compileElementNode(vNode);
                this.compileFragment(vNode);
                console.log('element',vNode);
            } else if(vNode.nodeType === 3) { //这特么怎么写的，回车咋处理？
                // this.compileTextNode(vNode);
                console.log('text',vNode);
            }
        });
    }

    compileElementNode(node) {
        let vAttrs = node.attributes; //这里返回的是属性节点集合,集合没有继承forEach
        console.log(Array.from(vAttrs));
        Array.from(vAttrs).forEach(attr => { //类数组集合转数组
            console.log(attr);
            let [,attrName] = attr.split('=');
            if(this.isDirection(attrName)) {
                console.log(attrName);
            }
        })
        // if(vAttrs.length) {
        //     Object.keys(vAttrs).forEach(index => {
        //         let [ ,attrName] = vAttrs[index].nodeName.split('v-');

        //         //获取data中的值替换到node中
        //         if(attrName) {
        //             let expr = vAttrs[index].nodeValue;
        //             this.updateNode(this.vm, attrName, expr);
        //         }
        //     })
        // }
    }

    compileTextNode(node) {
        console.log(node);
        let expr = node.replace(/{{([^}]+)}}/g,'$1');
        console.log(expr);
    }

    updateNode(vm, attrName, expr) {
        let update = Update[attrName];
        update(vm, expr);
    }

}

const Update = {
    model (vm, expr) {

    },
    text (vm, expr) {

    }

}