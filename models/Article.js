const DefaultModel = require("./DefaultModel");

class Article extends DefaultModel {
    /** @type {String} */
    title = "";
	
    /** @type {String} */
    body = "";
	
    /** @type {String} */
    author = "";
	
    /** @type {Date} */
    createdAt = null;
	
    /** @type {Date} */
    updatedAt = null;
	
    /** @type {Boolean} */
    status = false;

    constructor() {
        super();
        this.id = Article.formatId(this.id);
    }

    /**
     * Format id
     * @param {String} id 
     * @returns {String}
     */
    static formatId(id) {
        return `article#${id}`;
    }

    /**
     * @method fillDataForCreation Fills the data for create object on database.
     * @returns {Article}
     */
    fillDataForCreation(data) {
        Object.assign(this, data);
        this.createdAt = (new Date()).toISOString();
        this.updatedAt = (new Date()).toISOString();

        this.validateDataForCreation();
        return this;
    }

    /**
     * @method validateDataForCreation Validate data for create object on database.
     * @returns {Article}
     * @throws {Error}
     */
    validateDataForCreation() {
        if (!this.title) {
            throw new Error("Title is mandatory");
        }

        if (!this.author) { 
            throw new Error("Author is mandatory");
        }

        if (undefined === this.status) {
            this.status = false;
        }
        return this;
    }

    /**
     * @method fillDataForList Fills data from db query.
     * @returns {Article}
     */
    fillDataForList(data) {
        Object.assign(this, data);
        return this;
    }
}

module.exports = Article;