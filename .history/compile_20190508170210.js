class Compile {
    constructor (el) {
        let fragment = document.createDocumentFragment();
        let nodes = el.childNodes;
        nodes.forEach (node => {
            fragment.appendChild(node);
        })
        console.log(fragment);
    }
}