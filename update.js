import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableName,
        //'Key' defines the partition key and sort key of the item to be updated
        Key: {
            userid: "123", //The id of the author
            noteid: event.pathParameters.id, //The id of the note of the author
        },
        //'UpdateExpression' defines the attributes to be updated
        //'ExpressionAttributeValues' defines the values in the updated expression
        UpdateExpression: "SET content = :content, attachment = :attachment",
        ExpressionAttributeValues: {
            ":attachment": data.attachment || null,
            ":content": data.content || null,
        },
        // 'ReturnValues' specifies if and how to return the item's attributes,
        // where ALL_NEW returns all attributes of the item after the update;
        // you can inspect 'result' below to see how it works with different settings
        ReturnValues: "ALL_NEW",
    };

    await dynamoDb.update(params);

    return { status: true };
});