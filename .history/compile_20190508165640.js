class Compile {
    constructor (el) {
        let fragment = document.createDocumentFragment();
        let nodes = el.childNodes;
        console.log(nodes);
        nodes.forEach ((node,index) => {
            fragment.appendChild(nodes[index]);
        })
    }
}