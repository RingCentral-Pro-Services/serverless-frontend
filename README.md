# Deploying ReactJS app (or any static web app) to S3 and Cloudfront using Serverless

## About
This is a plugin for the [Serverless Framework](https://serverless.com) that allows you to deploy any static website to S3 and CloudFront. Follow the instructions in the instructions section below to use the plugin with your project.

This plugin implements the Professional Services front-end reference architecture for Serverless and AWS. The latest up-to-date diagram of the front-end reference architecture can be found on the [PS Dev Wiki](https://wiki.ringcentral.com/display/PROS/AWS+Reference+Architecture).

This plugin uses the following AWS services:
* S3
* CloudFront
* Web Application Firewall (WAF)
* Route53 DNS
* AWS Certificate Manager (ACM)

### S3
This plugin deploys the S3 bucket with all public access disabled as per RingCentral corporate security guidelines. The only entities allowed to access the S3 bucket are the CloudFront Origin Access Identity and the bucket owner.

S3 bucket gets its name from the string specified under the serverless custom variables section:
```
custom: 
  s3Bucket:
```

### CloudFront
CloudFront is the CDN that serves your content from the S3 bucket. CloudFront caches the content and serves it from the closest S3 edge location to the user. CloudFront is also where the WebACL(s) for the WAF are applied. This plugin grants CloudFront access to the private S3 bucket it creates by means of an OAI (Origin Access Identity) per AWS best practices for accessing restricted buckets.

### Web Application Firewall (WAF)
The WAF in this plugin is configured to deny access to any subnet that is not an RingCentral corporate subnet. If public access to the front-end of the application is desired, then simply comment out or remove the WebACL, WAFRule and WAFIpSet lines and remove the reference to the WebACLId from the CloudFront distribution section.

### Route 53 DNS
The plugin automatically creates a DNS entry in Route53 for the app in the custom domain specified under the serverless custom variables section:
```
custom:
  appDomain: 'ringcentralps.com'
  appEndpoint: 'kyle-testing-oai'
  acmCertificateArn: 'arn:aws:acm:us-east-1:179104732438:certificate/f92a9247-ce16-471f-b808-be36a2xxxxxx' # The Amazon Resource Name (ARN) of an AWS Certificate Manager (ACM) certificate.
```
For example, if your appEndpoint is set to `app-xyz` and your appDomain is set to `ringcentralps.com`, then your app will be located at `app-xyz.ringcentralps.com` after deployment (the default CloudFront URL will remain accessible as well).

An ACM certificate (SSL/TLS) validated against the domain being used as the value of 'appDomain' is required unless using the default CloudFront certificate. Using the default certificate can be useful, for example, if you only need to use the default CloudFront URL during Dev/QA and do not need the custom domain functionality. See ACM section below.

### AWS Certificate Manager (ACM)
The plugin uses ACM to automatically apply an SSL/TLS certificate to the application. You must specify the ARN of the certificate from ACM in the serverless custom variables section:
```
custom:
  acmCertificateArn: 'arn:aws:acm:us-east-1:179104732438:certificate/f92a9247-ce16-471f-b808-be36a2xxxxxx' # The Amazon Resource Name (ARN) of an AWS Certificate Manager (ACM) certificate.
```

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

6. `npm install` to get the plugin.

7. Set S3 bucket name in serverless.yml (create in root of project). It deploys app/ folder right now, may need to change.

8. Then deploy `sudo serverless deploy --verbose`

9. Then sync app/ to S3 bucket, `sudo serverless syncToS3`

10. Check what domain was generated `sudo serverless domainInfo`

11. Invalidate CloudFront cache after making changes to CloudFront Distribution `sudo serverless invalidateCloudFrontCache`.

## TODOS
* Box it up as a private NPM package instead of having to manually add the file to package.json.
* Enhance 'serverless domainInfo" plugin command to return custom domain along with the auto-generated cloudfront domain.
* SSM for encrypting environmental variables.


