class Compile {
    constructor (el) {
        let fragment = document.createDocumentFragment();
        let nodes = el.childNodes;
        console.log(nodes.length);
        nodes.forEach (node => {
            fragment.appendChild(node);
        })
        console.log(fragment);
    }
}