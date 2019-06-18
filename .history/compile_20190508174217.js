class Compile {
    constructor (el) {
        let fragment = document.createDocumentFragment();
        let nodes = el.childNodes;
        console.log(nodes);
        while(nodes) {
            if(nodes[0].nodeType === 1) {
                fragment.appendChild(nodes[0]);
            }
        }
        console.log(fragment);
    }
}