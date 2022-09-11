const ContentHistory = require("./ContentHistory");
const DefaultModel = require("./DefaultModel");

class Article extends DefaultModel {
    /** @type {String} */
    title = "";
	
    /** @type {ContentHistory[]} */
    content = [];
	
    /** @type {String} */
    author = "";
	
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
        this.title = data.title;
        this.author = data.author;
        this.status = data.status;
        this.content.push(new ContentHistory(data.body));

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