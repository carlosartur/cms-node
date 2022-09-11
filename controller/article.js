const DatabaseHandler = require("../database/DatabaseHandler");
const Article = require("../models/Article");

const listArticle = async (event) => {
    const dbHandler = new DatabaseHandler();
    const result = await dbHandler.listModels();
    
    let articleList = [];
    result.Items.forEach(item => {
        const article = new Article();
        article.fillDataForList(item);
        articleList.push(article);
    });

    return {
        statusCode: 200,
        body: JSON.stringify(articleList),
        headers: {
            "Content-Type":  "application/json"
        }
    };
};

const getArticle = async (event) => {
    try {
        if (!event.queryStringParameters?.id) {
            throw {
                message: "You must provide a id to get a article.",
                status: 404
            };
        }

        const dbHandler = new DatabaseHandler();
        const result = await dbHandler.getOne(
            Article.formatId(event.queryStringParameters.id)
        );
        
        if (!result.Item) {
            throw {
                message: "Article not found.",
                status: 404
            };
        }

        const article = new Article();
        article.fillDataForList(result.Item);

        return {
            statusCode: 200,
            body: JSON.stringify(article),
            headers: {
                "Content-Type": "application/json"
            }
        };
    } catch (error) {
        return {
            statusCode: error.status || 500,
            body: JSON.stringify(error.message),
            headers: {
                "Content-Type": "application/json"
            }
        };
    }
};

const createArticle = async (event) => {
    try {
        const dbHandler = new DatabaseHandler();
        const article = new Article();
        article.fillDataForCreation(JSON.parse(event.body));

        const data = await dbHandler.saveNewModel(article);
        
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

const deleteArticle = async (event) => {
    try {
        if (!event.queryStringParameters?.id) {
            throw new Error("You must provide a id to delete a article.");
        }

        const dbHandler = new DatabaseHandler();
        const result = await dbHandler.deleteOne(
            Article.formatId(event.queryStringParameters.id)
        );

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: `Article #${event.queryStringParameters.id} deleted with success!`
            }),
            headers: {
                "Content-Type": "application/json"
            }
        };
    } catch (error) {
        return {
            statusCode: 200,
            body: JSON.stringify(error.message),
            headers: {
                "Content-Type": "application/json"
            }
        };
    }
};

module.exports = { listArticle, createArticle, getArticle, deleteArticle };