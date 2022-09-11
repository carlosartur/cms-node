const { v4: uuidv4 } = require('uuid');

class DefaultModel {
    /** @type {String} */
    id = null;

    /** @type {Date} */
    createdAt = null;
	
    /** @type {Date} */
    updatedAt = null;

    constructor() { 
        this.id = uuidv4();
        this.createdAt = (new Date()).toISOString();
        this.updatedAt = (new Date()).toISOString();
    }
}

module.exports = DefaultModel;