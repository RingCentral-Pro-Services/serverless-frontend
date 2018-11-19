# Deploying ReactJS app to S3 and Cloudfront using Serverless

## Instructions
1. Install serverless framework `npm install -g serverless`.

2. Install AWS CLI (on Ubuntu 18.04) `sudo apt install awscli`.

3. Setup AWS credentials using serverless `serverless config credentials --provider aws --key AKIAIOSFODNN7EXAMPLE --secret wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`

4. Copy serverless-single-page-app-plugin folder to root of project.
5. Add plugin to package.json devDependencies section:

```
"devDependencies": {
    "serverless-single-page-app-plugin": "file:./serverless-single-page-app-plugin"
}
```

6. `npm install` to get plugin.
7. Set S3 bucket name in serverless.yml (create in root of project). It deploys /app folder right now, need to change
8. Then deploy `sudo serverless deploy --verbose`
9. Then sync app/ to S3 bucket, `sudo serverless syncToS3`
10. Check what domain was generated `sudo serverless domainInfo`
11. Invalidate CloudFront cache after making changes to CloudFront Distribution `sudo serverless invalidateCloudFrontCache`.
