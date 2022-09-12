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
        this.setUpdatedAtAsNow();
    }

    /**
     * Set updatedAt to current time
     */
    setUpdatedAtAsNow() {
        this.updatedAt = (new Date()).toISOString();
    }
    
    /**
     * Fills this object with data that comes from database.
     * @param {Object} data 
     * @returns 
     */
    fillDataFromDatabase(data) {
        Object.assign(this, data);
        return this;
    }
}

module.exports = DefaultModel;