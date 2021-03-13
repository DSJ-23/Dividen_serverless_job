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
