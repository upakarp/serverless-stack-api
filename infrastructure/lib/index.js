import CognitoStack from "./CognitoStack";
import DynamoDBStack from "./DynamoDBStack";
import S3Stack from "./S3Stack";

export default function main(app) {
  new DynamoDBStack(app, "dynamodb");
  const s3 = new S3Stack(app, "s3");
  new CognitoStack(app, "cognito", { bucketArn:s3.bucket.bucketArn });
}
