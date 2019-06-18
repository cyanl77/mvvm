class Vue {
    constructor (options) {
        this.$data = options.data;
        this.$el = options.el;
        if(typeof this.$el === "string" ) { //if(Object.prototype.toString.call(this.$el) === '[object String]')
            let elNode = document.getElementById(this.$el);
            observer(this.$data);
            new Compile (elNode, this);
        }
    }
}