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
        console.log(fragment);
    }

    //辅助方法


    //核心方法
    compileNode(node) {
        let vAttr = node.getAttribute;
    }

    compileTextNode(node) {

    }


}