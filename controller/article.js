const DatabaseHandler = require("../database/DatabaseHandler");
const NotFoundError = require("../Error/NotFoundError");
const Article = require("../models/Article");
const Patch = require("../Util/Patch");

const listArticle = async (event) => {
    const dbHandler = new DatabaseHandler();
    const result = await dbHandler.listModels();
    
    let articleList = [];
    result.Items.forEach(item => {
        const article = new Article();
        article.fillDataFromDatabase(item);
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
            throw new NotFoundError("You must provide a id to get a article.");
        }

        const dbHandler = new DatabaseHandler();
        const result = await dbHandler.getOne(
            Article.formatId(event.queryStringParameters.id)
        );
        
        if (!result.Item) {
            throw new NotFoundError("Article not found.");
        }

        const article = new Article();
        article.fillDataFromDatabase(result.Item);

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

        const data = await dbHandler.saveModel(article);
        
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
            throw new NotFoundError("You must provide a id to delete a article.");
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
            statusCode: error.status || 500,
            body: JSON.stringify(error.message),
            headers: {
                "Content-Type": "application/json"
            }
        };
    }
};

const updateArticle = async (event) => {
    try {
        if (!event.queryStringParameters?.id) {
            throw new NotFoundError("You must provide a id to update a article.");
        }

        const dbHandler = new DatabaseHandler();
        const result = await dbHandler.getOne(
            Article.formatId(event.queryStringParameters.id)
        );

        if (!result.Item) {
            throw new NotFoundError("Article not found.");
        }

        const article = new Article();
        article.fillDataFromDatabase(result.Item);
        article.fillDataForUpdate(JSON.parse(event.body));
        
        await dbHandler.saveModel(article);

        return {
            statusCode: 200,
            body: JSON.stringify(article),
            headers: {
                "Content-Type": "application/json"
            }
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: error.status || 500,
            body: JSON.stringify(error.message),
            headers: {
                "Content-Type": "application/json"
            }
        };
    }
};

const patchArticle = async (event) => {
    try {
        let patchData = JSON.parse(event.body);
        if (!Array.isArray(patchData)) {
            patchData = [patchData];
        }
        
        const dbHandler = new DatabaseHandler();
        
        let articlesModified = [];

        patchData.forEach(async patchOperation => {
            let operation = new Patch(patchOperation);
            if (operation.pathArray[0] !== "article") {
                throw new NotFoundError("Only articles can be managed by patch.");
            }

            if (
                !operation.pathArray[1]
                && ["replace", "remove", "move", "copy"].includes(operation.op)
            ) {
                throw new NotFoundError("You must pass article id for manage a article.");
            }
            
            let result = null;
            switch (operation.op) {
                case "replace":
                    let articleId = operation.from || operation.pathArray[1];
                    if (!articleId.includes(Article.formatId(""))) {
                        articleId = Article.formatId(articleId);
                    }

                    result = await dbHandler.getOne(articleId);

                    let articleToReplace = new Article();
                    articleToReplace.fillDataFromDatabase(result.Item);
                    articleToReplace.fillDataForCreation(operation.value);

                    result = await dbHandler.saveModel(articleToReplace);
                    articlesModified.push(result.model);
                    return;
                
                case "add":
                    const article = new Article();
                    article.fillDataForCreation(operation.value);
                    if (operation.pathArray[1]) {
                        article.id = Article.formatId(operation.pathArray[1]);
                    }

                    result = await dbHandler.saveModel(article);
                    articlesModified.push(result.model);
                    return;
                
                case "remove":
                    result = await dbHandler.deleteOne(
                        operation.pathArray[1]
                    );
                    return result;
                    
                case "move":
                case "copy":
                    let from = await dbHandler.getOne(
                        Article.formatId(operation.from)
                    );
                    
                    let to = await dbHandler.getOne(
                        Article.formatId(operation.pathArray[1])
                    );

                    let fromId = from.id;
                    Object.assign(from, to);
                    from.id = fromId;

                    result = await dbHandler.saveModel(article);
                    articlesModified.push(result.model);
                    return;
            }
        });

        return {
            statusCode: 200,
            body: JSON.stringify(articlesModified),
            headers: {
                "Content-Type": "application/json"
            }
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: error.status || 500,
            body: JSON.stringify(error.message),
            headers: {
                "Content-Type": "application/json"
            }
        };
    }
};


module.exports = {
    listArticle,
    createArticle,
    getArticle,
    deleteArticle,
    updateArticle,
    patchArticle
};