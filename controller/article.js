const DatabaseHandler = require("../database/DatabaseHandler");
const Article = require("../models/Article");

const list = async (event) => {
    const dbHandler = new DatabaseHandler();

    const result = await dbHandler.listModels();

    return {
        statusCode: 200,
        body: JSON.stringify(result.Items),
        headers: {
            "Content-Type":  "application/json"
        }
    };
};

 const create = async (event) => {
    try {
        const dbHandler = new DatabaseHandler();
        const article = new Article();
        const data = await dbHandler.saveNewModel(article);
        
        console.log(data);

        return {
            statusCode: 200,
            body: JSON.stringify(data.model),
            headers: {
                "Content-Type": "application/json"
            }
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error }),
            headers: {
                "Content-Type": "application/json"
            }
        };
    }
};

module.exports = { list, create };