class Compile {
    constructor (el) {
        let fragment = document.createDocumentFragment();
        let nodes = el.children;
        console.log(nodes);
        nodes.forEach (node => {
            fragment.appendChild(node);
        })
        console.log(fragment);
    }
}