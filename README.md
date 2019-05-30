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

The serverless code for this plugin comes in two flavors, one intended for use during development and one intended for use in production. The only differences are that the production code uses custom domains and certificates which cost more and are not needed during development (during development it is generally fine to use the default CloudFront URL and certificate). They are otherwise identical.

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
If using the production code, the plugin automatically creates a DNS entry in Route53 for the app inside the custom domain specified under the serverless custom variables section:
```
custom:
  appDomain: 'ringcentralps.com'
  appEndpoint: 'kyle-testing-oai'
  acmCertificateArn: 'arn:aws:acm:us-east-1:179104732438:certificate/f92a9247-ce16-471f-b808-be36a2xxxxxx' # The Amazon Resource Name (ARN) of an AWS Certificate Manager (ACM) certificate.
```
For example, if your appEndpoint is set to `app-xyz` and your appDomain is set to `ringcentralps.com`, then your app will be located at `app-xyz.ringcentralps.com` after deployment (the default CloudFront URL will remain accessible as well).

An existing ACM certificate (SSL/TLS) validated against the domain being used as the value of 'appDomain' is required. See the ACM section below.

If using the development code, the default CloudFront SSL certificate and auto-generated URL will be used. You can retrieve the default CloudFront URL for your app after deployment by running the `sudo serverless domainInfo` command (see the Instructions section below for more information).

### AWS Certificate Manager (ACM)
If using the production code, the plugin will use ACM to automatically apply an SSL/TLS certificate to the application. You must specify the ARN of the certificate from ACM in the serverless custom variables section:
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

7. Set the `service:` parameter at the top of the file (either `serverless-for-development.yml` or `serverless-for-production.yml`) to your desired service name. This is what AWS will use to name your CloudFormation stacks. Rename the file to `serverless.yml` (make sure it is in the root of the project).

8. If using the development version, simply set the `s3Bucket` parameter to what you want your bucket named. It deploys app/ folder right now, may need to change that. If using the production version, set the `s3Bucket`, `appDomain`, `appEndpoint` and `acmCertificateArn` parameters to your values. It also deploys app/ folder as of now.

9. Then deploy `sudo serverless deploy --verbose`

10. Then sync your app/ folder to the S3 bucket, `sudo serverless syncToS3`

11. Check what domain was generated `sudo serverless domainInfo`

12. Invalidate CloudFront cache after making changes to CloudFront Distribution `sudo serverless invalidateCloudFrontCache`.

## TODOS
* Box it up as a private NPM package instead of having to manually add the file to package.json.
* Enhance `serverless domainInfo` plugin command to return custom domain along with the auto-generated cloudfront domain.
* SSM for encrypting environmental variables.


