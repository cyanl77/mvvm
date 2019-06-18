class Compile {
    constructor (el) {
        console.log(el);
        let fragment = document.createDocumentFragment();
        let nodes = el.childNodes;
        nodes.forEach (node => {
            fragment.appendChild(node);
        })
        console.log(fragment);
    }
}