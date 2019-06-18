class Compile {
    constructor (el) {
        let fragment = document.createDocumentFragment();
        let nodes = el.childNodes;
        console.log(nodes);

        //由于childnodes被加入fragment一个时就自动少一个，不能用foreach来加入fragment, foreach内部计数对元素进行执行。
        while(nodes) {
            if(nodes[0].nodeType === 1) {
                fragment.appendChild(nodes[0]);
            }
        }
        console.log(fragment);
    }
}