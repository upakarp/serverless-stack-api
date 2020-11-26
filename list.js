import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
    const params = {
        TableName: process.env.tableName,
        // 'KeyConditionExpression' defines the condition for the query
        // - 'userid = :userid': only return items with matching 'userid' partition key
        KeyConditionExpression: "userid = :userid",
        // 'ExpressionAttributeValues' defines the value in the condition
        // -':userid': defines 'userid' to be the id of the author
        ExpressionAttributeValues: {
            ":userid": event.requestContext.identity.cognitoIdentityId
        },
    };

    const result = await dynamoDb.query(params);

    return result.Items;
});