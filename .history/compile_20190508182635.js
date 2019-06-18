class Compile {
    constructor (el) {
        let fragment = document.createDocumentFragment();
        let nodes = el.children;
        console.log(nodes);

        //将document中的节点移动到fragment中处理
        //由于childnodes被加入fragment一个时就自动少一个，不能用foreach来加入fragment, foreach内部计数对元素进行执行。
        //childNodes只返回第一层节点
        while(nodes.length > 0) {
            let currentNode = nodes[0];
            if(nodes[0].nodeType === 1) {
                // this.compileNode(currentNode);
            } else if(currentNode.nodeType === 3) {
                // this.compileTextNode(currentNode);
            }
            fragment.appendChild(currentNode);
        }
    },

    //辅助方法


    //核心方法
    compileNode(node) {
        let vAttr = node.getAttribute
    },

    compileTextNode(node) {

    }


}