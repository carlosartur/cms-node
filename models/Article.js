const DefaultModel = require("./DefaultModel");

class Article extends DefaultModel {
    constructor() {
        super();
        this.id = `article#${this.id }`;
    }
}

module.exports = Article;