# Deploying ReactJS app to S3 and Cloudfront using Serverless

## Instructions
*Install serverless framework `npm install -g serverless`.
*Install AWS CLI (on Ubuntu 18.04) `sudo apt install awscli`.
*Setup AWS credentials using serverless `serverless config credentials --provider aws --key AKIAIOSFODNN7EXAMPLE --secret wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`
*Copy serverless-single-page-app-plugin folder to root of project.
*Add plugin to package.json devDependencies section:

```
"devDependencies": {
    "serverless-single-page-app-plugin": "file:./serverless-single-page-app-plugin"
}
```

*npm install to get plugin.
*Set S3 bucket name in serverless.yml (create in root of project).
*It deploys /app folder right now, need to change
*Then deploy `sudo serverless deploy --verbose`
*Then sync app/ to S3 bucket, `sudo serverless syncToS3`
*Check what domain was generated `sudo serverless domainInfo`
*Invalidate CloudFront cache after making changes to CloudFront Distribution `sudo serverless invalidateCloudFrontCache`.
