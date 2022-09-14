const AWS = require('aws-sdk');
const DefaultModel = require('../models/DefaultModel');

class DatabaseHandler {
    /** @type {AWS.DynamoDB.DocumentClient} */
    dynamoDbClient = null;

    /** @type {Object} */
    params = {
        TableName: "articles",
    };

    constructor() {
        this.dynamoDbClient = new AWS.DynamoDB.DocumentClient({
            endpoint: "http://localhost:8000"
        });
    }

    /**
     * 
     * @param {DefaultModel} model 
     */
    async saveModel(model) {
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

    async listModels() {
        try {
            let dynamoResponse = this.dynamoDbClient
                .scan(this.getParams())
                .promise();

            return dynamoResponse;
        } catch (error) {
            throw error;
        }
    }

    async getOne(id) {
        try {
            let dynamoResponse = this.dynamoDbClient
                .get(this.getParams({
                    Key: { id }
                }))
                .promise();

            return dynamoResponse;
        } catch (error) {
            throw error;
        }
    }

    async deleteOne(id) {
        try {
            let dynamoResponse = this.dynamoDbClient
                .delete(this.getParams({
                    Key: { id }
                }))
                .promise();

            return dynamoResponse;
        } catch (error) {
            throw error;
        }
    }

    /**
     * @method getParams Merge additional parameters with default ones. 
     * Additional parameter given has priority over default ones.
     * @param {Object} additionalParams 
     * @returns 
     */
    getParams(additionalParams = {}) {
        return Object.assign({}, this.params, additionalParams);
    }
}

module.exports = DatabaseHandler;