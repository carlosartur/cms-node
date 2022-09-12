const Article = require("./Article");
const DefaultModel = require("./DefaultModel");

class ContentHistory extends DefaultModel {
    /** @type {String} */
    body = "";

    /** @type {Number} */
    versionNumber = 0;

    /**
     * @param {Article} article 
     * @param {String} body 
     */
    constructor(article = null, body = null) {
        super();
        this.id = ContentHistory.formatId(this.id);
        
        if (body) {
            this.body = body;
        }

        if (article) {
            article.content.push(this);
            this.versionNumber = article.content.length;
        }
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