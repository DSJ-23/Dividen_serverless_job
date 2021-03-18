Serverless functions to hopefully load stock data into dynamodb table.

Have serverless npm package installed. Make sure to have credentials in env.


Output your lambda functions into a funciton

```
aws lambda list-functions > output.json
```


Invoke from cli without event specified

```
aws lambda invoke --function-name dividend-job-dev-hello create_eg.json
```

Invoke with payload from example.kson file
```
aws lambda invoke --function-name dividend-job-dev-hello --cli-binary-format raw-in-base64-out --payload file://example.json create_eg.json
```

Invoke with custom payload

```
aws lambda invoke --function-name dividend-job-dev-hello --cli-binary-format raw-in-base64-out --payload '{"id": "14141234", "ticker": "value2", "stock": "aa", "yield": "11dfadf"}' create_eg.json
```

To update a single function 
```
sls deploy -f getAllInfo
```

Get All Info invoke
```
aws lambda invoke --function-name dividend-job-dev-getAllInfo all.json
```

Get One Invoke example 
```
aws lambda invoke --function-name dividend-job-dev-byTicker --cli-binary-format raw-in-base64-out --payload '{"id": "4a25183b-b7cc-4caf-81a1-96f1a6bfae34"}' new.json
```

Delete invoke 
```
aws lambda invoke --function-name dividend-job-dev-deleteTicker --cli-binary-format raw-in-base64-out --payload '{"id": "5668ffc8-0073-4b27-bdf4-8f0f8c3999eb"}' delete.json
```

To re-deploy a single function
```
sls deploy -f FunctionName
``` 

where the function name is the name of the function in the acutal js/python file
