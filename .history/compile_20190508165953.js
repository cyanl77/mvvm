class Compile {
    constructor (el) {
        let fragment = document.createDocumentFragment();
        let nodes = el.childNodes;
        console.log(nodes);
        // for(var i = 0 ; i < nodes.length; i++) {
        //     console.log(nodes[i]);
        //     fragment.appendChild(nodes[i]);
        // }
        nodes.forEach ((node,index) => {
            fragment.appendChild(nodes[index]);
        })
        console.log(fragment);
    }
}