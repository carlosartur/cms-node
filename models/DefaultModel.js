const { v4: uuidv4 } = require('uuid');

class DefaultModel {
    /** @type {String} */
    id = null;

    constructor() { 
        this.id = uuidv4();
    }
}

module.exports = DefaultModel;