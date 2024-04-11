console.log("Starting the server...");
const express = require("express");
const { DynamoDBClient, QueryCommand } = require("@aws-sdk/client-dynamodb");
const cors = require("cors"); //the cors middleware

//  DynamoDB client using the AWS SDK
const client = new DynamoDBClient({
  region: "ap-south-1",
  credentials: {
    accessKeyId: 'AKIA2AXGIULGA4MOVWFJ',
    secretAccessKey: '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',
  },
  })

const app = express();
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET"], 
}));

app.get("/fetch-data/:stateName", async (req, res) => {
  try {
    const stateName = req.params.stateName;
    console.log(stateName)

    const tableName = "data_crop_india";

    let lastEvaluatedKey = null;
    let allData = [];

    do {
      const params = {
        TableName: tableName,
        KeyConditionExpression: "#stateAttr = :stateValue",
        ExpressionAttributeNames: {
          "#stateAttr": "State",
        },
        ExpressionAttributeValues: {
          ":stateValue": { S: stateName },
        },
        ExclusiveStartKey: lastEvaluatedKey,
      };

      const command = new QueryCommand(params);
      const data = await client.send(command);

      if (!data || !data.Items || data.Items.length === 0) {
        break;
      }

      allData.push(...data.Items);
      lastEvaluatedKey = data.LastEvaluatedKey;
    } while (lastEvaluatedKey);

    res.status(200).json(allData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching data" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});