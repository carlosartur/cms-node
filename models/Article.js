const PatchError = require("../Error/PatchError");
const Patch = require("../Util/Patch");
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
        new ContentHistory(this, data.body);

        this.validateDataForCreation();
        return this;
    }

    /**
     * Use JSON Patch data for update 
     * @param {Object[]} patchData 
     */
    fillDataForUpdate(patchData) {
        if (!Array.isArray(patchData)) {
            patchData = [patchData];
        }

        patchData.forEach(patchOperation => {
            const operation = new Patch(patchOperation);

            if (["remove", "add", "replace"].includes(operation.op)) {
                if ("content" === operation.pathArray[0]) {    
                    this.updateHistory(operation);
                    return;
                }

                this[operation.pathArray[0]] = operation.value;
            }
        }, this);

        this.setUpdatedAtAsNow();
    }

    /**
     * Updates, remove or add new history on update article.
     * @param {Patch} operation 
     * @returns {void}
     */
    updateHistory(operation) {
        if ("add" === operation.op) {
            new ContentHistory(this, operation.value.body); 
            return;
        }

        if (
            "content" != operation.pathArray[0]
            || isNaN(operation.pathArray[1])
            || undefined === this.content[operation.pathArray[1]]
        ) {
            throw new PatchError(`Path "${operation.path}" invalid.`);
        }

        if ("remove" === operation.op) {
            delete this.content[operation.pathArray[1]];
            return;
        }

        /** @type {ContentHistory} */
        let history = this.content[operation.pathArray[1]];
        history.fillDataFromDatabase(operation.value);
        history.setUpdatedAtAsNow();
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
     * @method fillDataFromDatabase Fills data from db query.
     * @returns {Article}
     */
    fillDataFromDatabase(data) {
        Object.assign(this, data);
        
        this.content.forEach((item, index) => {
            this.content[index] = (new ContentHistory())
                .fillDataFromDatabase(item);
        }, this);

        return this;
    }
}

module.exports = Article;