class Compile {
    constructor (el) {
        let fragment = document.createDocumentFragment();
        let nodes = el.childNodes;
        console.log(nodes);

        //将document中的节点移动到fragment中处理
        //由于childnodes被加入fragment一个时就自动少一个，不能用foreach来加入fragment, foreach内部计数对元素进行执行。
        //childNodes只返回第一层节点
        while(nodes.length > 0) {
            fragment.appendChild(nodes[0]);
        }

        //在模板中解析vue相关模板
        let vNodes = fragment.childNodes;
        vNodes.forEach( vNode => {
            if(vNode.nodeType === 1) {
                this.compileNode(vNode);
            } else if(vNode.nodeType === 3) {
                this.compileTextNode(vNode);
            }
        });
        console.log(fragment);
    }

    //辅助方法


    //核心方法
    compileNode(node) {
        let vAttrs = node.attributes;
        console.log(vAttrs);
        if(vAttrs.length) {
            Object.keys(vAttrs).forEach(index => {
                let [attrName, ] = vAttrs[index].nodeName.split('=');
                console.log(attrName);
            })
        }
    }

    compileTextNode(node) {
        console.log(node, 'text');
    }


}