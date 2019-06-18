class Compile {
    constructor (el) {
        let fragment = document.createDocumentFragment();
        let nodes = el.childNodes;
        console.log(nodes);

        //将document中的节点移动到fragment中处理
        //由于childnodes被加入fragment一个时就自动少一个，不能用foreach来加入fragment, foreach内部计数对元素进行执行。
        //childNodes只返回第一层节点
        while(nodes.length > 0) {
            if(nodes[0].nodeType === 1) {
                this.compileNode(node);
            } else if(nodes[0].nodeType === 3) {
                el.removeChild(nodes[0]);
            }
            fragment.appendChild(nodes[0]);
        }

        console.log(fragment);
    }

}