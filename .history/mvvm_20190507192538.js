class Vue {
    constructor (option) {
        this.$data = options.data;
        this.$el = options.el;
        new Compile (this.$el);
    }
}