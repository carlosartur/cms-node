class Patch {
    /** @type {String} */
    #op = "";

    /** @type {String} */
    #path = "";

    /** @type {any} */
    #value = null;

    /** @type {String} */
    from = "";

    constructor(data) {
        this.op = data.op;
        this.from = data.from || null;
        this.#path = data.path;
        this.#value = data.value;
    }

    /**
     * @param {String}
     * @type {String}
     */
    set op(value) {
        const validOperations = ["add", "replace", "remove", "move", "copy"];
        if (!validOperations.includes(value)) {
            throw new Error(`Invalid operation: ${value}`);
        }

        this.#op = value;
    }

    /**
     * @type {String}
     */
    get op() {
        return this.#op;
    }

    /**
     * @type {Boolean}
     */
    get arrayOperation() {
        return 1 < this.path.length;
    }

    /**
     * @type {Array}
     */
    get pathArray() {
        if (this.#path[0] != "/") {
            this.#path = "/" + this.#path;
        }
        let path = this.#path.split("/");
        path.shift();
        return path;
    }

    /**
     * @type {String}
     */
    get path() {
        return this.#path;
    }

    /**
     * @type {any|null}
     */
    get value() {
        if (
            "remove" === this.#op
            || undefined === this.#value
        ) {
            return null;
        }

        return this.#value;
    }
}

module.exports = Patch;