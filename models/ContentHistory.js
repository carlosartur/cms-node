const DefaultModel = require("./DefaultModel");

class ContentHistory extends DefaultModel {

    constructor(body) {
        super();
        this.id = ContentHistory.formatId(this.id);
        this.body = body;
    }

    /**
     * Format id
     * @param {String} id 
     * @returns {String}
     */
    static formatId(id) {
        return `contentHistory#${id}`;
    }
}

module.exports = ContentHistory;