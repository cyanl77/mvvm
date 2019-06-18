class Compile {
    constructor (el) {
        let fragment = document.createDocumentFragment();
        console.log(fragment);
        let nodes = el.childNodes;
        console.log(nodes);
        nodes.forEach (node => {
            console.log(node);
            fragment.appendChild(node);
        })
    }
}