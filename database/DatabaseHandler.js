const AWS = require('aws-sdk');
const DefaultModel = require('../models/DefaultModel');

class DatabaseHandler {
    /** @type {AWS.DynamoDB.DocumentClient} */
    dynamoDbClient = null;

    constructor() {
        this.dynamoDbClient = new AWS.DynamoDB.DocumentClient({
            endpoint: "http://localhost:8000"
        });
    }

    /**
     * 
     * @param {DefaultModel} model 
     */
    async saveNewModel(model) {
        let params = {
            TableName: "articles",
            Item: model
        };

        try {
            let response = await this.dynamoDbClient
                .put(params)
                .promise();

            return { response, model };
        } catch (error) {
            throw error;
        }
    }

    listModels() {
        let params = {
            TableName: "articles"
        };

        try {
            let dynamoResponse = this.dynamoDbClient
                .scan(params);

            return dynamoResponse;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DatabaseHandler;