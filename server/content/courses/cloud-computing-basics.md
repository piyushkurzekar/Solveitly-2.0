<!-- lesson: what-is-cloud-computing | What is Cloud Computing? | 10 -->

**Cloud computing** means renting computing resources — servers, storage, databases, networking and software — over the internet, and paying only for what you use, instead of buying and running your own hardware.

## Before and after the cloud

| Traditional (on-premises) | Cloud |
|---|---|
| Buy servers up front (CapEx) | Pay as you go (OpEx) |
| Weeks to set up new hardware | New servers in minutes |
| Plan for peak load — idle most of the time | Scale up and down automatically |
| Your team maintains everything | Provider maintains the physical infrastructure |

## The five essential characteristics (NIST)

1. **On-demand self-service** — create resources yourself from a web console or API.
2. **Broad network access** — available from anywhere over the internet.
3. **Resource pooling** — the provider shares hardware among many customers securely.
4. **Rapid elasticity** — scale out when traffic spikes, scale in when it drops.
5. **Measured service** — usage is metered and billed precisely.

## Major cloud providers

| Provider | Known for |
|---|---|
| **Amazon Web Services (AWS)** | largest and oldest, widest range of services |
| **Microsoft Azure** | strong enterprise and Microsoft/Windows integration |
| **Google Cloud (GCP)** | data analytics, Kubernetes and AI |

## Regions and availability zones

Providers run data centres around the world:

- A **region** is a geographic area (e.g. *Mumbai — ap-south-1* on AWS, *Central India* on Azure).
- Each region has several **availability zones (AZs)** — separate data centres with independent power and networking.

Deploying across multiple AZs keeps your app running even if one data centre fails. Choose a region close to your users for lower latency.

## Benefits

- **Cost** — no upfront hardware; pay per second/hour/GB.
- **Scalability** — handle a sudden surge (e.g. exam results day).
- **Reliability** — built-in redundancy and backups.
- **Speed** — experiment and launch faster.
- **Global reach** — deploy close to users worldwide.

## The shared responsibility model

Security is shared: the provider secures **the cloud** (data centres, hardware, network), and you secure **what you put in the cloud** (your data, user accounts, passwords, firewall rules, application code).

## Key takeaways

- The cloud turns hardware into an on-demand, metered service.
- Regions and availability zones provide performance and resilience.
- Security responsibilities are shared between you and the provider.

## Practice

List three apps you use daily and guess which cloud services they rely on (storage for photos, databases for messages, video streaming, etc.).

<!-- lesson: service-models | Service Models: IaaS, PaaS, SaaS | 15 -->

Cloud services are grouped by **how much the provider manages for you**.

```
              On-premises   IaaS        PaaS        SaaS
Application   You           You         You         Provider
Data          You           You         You         Provider
Runtime       You           You         Provider    Provider
OS            You           You         Provider    Provider
Servers       You           Provider    Provider    Provider
Storage       You           Provider    Provider    Provider
Networking    You           Provider    Provider    Provider
```

## IaaS — Infrastructure as a Service

You rent **virtual machines, storage and networks**. You install and manage the operating system, runtime and application.

- **Examples:** AWS EC2, Azure Virtual Machines, Google Compute Engine.
- **Use when:** you need full control — custom software, legacy apps, special OS settings.
- **Analogy:** renting an empty flat — you bring the furniture.

## PaaS — Platform as a Service

You deploy **your code**; the provider runs the servers, OS, scaling and patching.

- **Examples:** AWS Elastic Beanstalk, Azure App Service, Google App Engine, Heroku, Render.
- **Use when:** you want to focus on building the app, not maintaining servers.
- **Analogy:** a furnished flat — just move in.

## SaaS — Software as a Service

You use a **finished application** in the browser; the provider manages everything.

- **Examples:** Gmail, Microsoft 365, Zoom, Salesforce, Canva.
- **Use when:** you need a ready-made tool.
- **Analogy:** a hotel room — everything is handled for you.

## Serverless (FaaS)

**Functions as a Service** run small pieces of code in response to events, scaling to zero when idle. You pay only while the code runs.

```js
// AWS Lambda handler (Node.js)
export const handler = async (event) => {
  const name = event.queryStringParameters?.name ?? "learner";
  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Hello, ${name}!` }),
  };
};
```

- **Examples:** AWS Lambda, Azure Functions, Google Cloud Functions.

## Choosing a model

| Need | Best fit |
|---|---|
| Full OS control | IaaS |
| Deploy a web app quickly | PaaS |
| Use email / office tools | SaaS |
| Run code on events (uploads, schedules) | Serverless |

## Key takeaways

- The higher the model (IaaS → PaaS → SaaS), the less you manage.
- PaaS and serverless let small teams ship fast.
- Most companies use a mix of all models.

## Practice

For a college e-learning portal, decide which model you would use for (1) the website, (2) video storage, (3) staff email and (4) a nightly job that emails progress reports — and explain why.

<!-- lesson: deployment-models | Deployment Models | 10 -->

Deployment models describe **where** the cloud runs and **who** can use it.

## Public cloud

Infrastructure owned by a provider (AWS, Azure, GCP) and shared by many customers.

- ✅ No hardware to buy, massive scale, pay as you go.
- ❌ Less control; data lives in the provider's data centres.
- **Good for:** startups, websites, most new applications.

## Private cloud

Cloud infrastructure used by **one organisation** — in its own data centre or hosted by a provider.

- ✅ Maximum control, customisation and compliance.
- ❌ Expensive; you maintain the hardware and software (e.g. OpenStack, VMware).
- **Good for:** banks, governments, highly regulated industries.

## Hybrid cloud

A **combination** of private and public cloud connected together. Sensitive data can stay private while public cloud handles variable workloads.

- ✅ Flexibility; "burst" into the public cloud during peaks.
- ❌ More complex networking and management.
- **Example:** a hospital keeps patient records on-premises but runs its appointment website on Azure.

## Multi-cloud

Using services from **more than one public provider** — for example AWS for compute and Google Cloud for analytics.

- ✅ Avoid vendor lock-in, pick the best service from each.
- ❌ More skills and tooling required.

## Community cloud

Shared by several organisations with common requirements (e.g. universities or government departments).

## Comparison

| Model | Control | Cost | Scalability | Typical user |
|---|---|---|---|---|
| Public | Low | Low (pay per use) | Very high | Startups, web apps |
| Private | High | High | Limited by hardware | Banks, government |
| Hybrid | Medium–high | Medium | High | Enterprises in transition |
| Multi-cloud | Medium | Varies | Very high | Large tech companies |

## Key takeaways

- Public cloud is the default for most new projects.
- Private cloud trades cost for control and compliance.
- Hybrid and multi-cloud combine models for flexibility.

## Practice

A government exam portal has sensitive candidate data but huge traffic on result day. Which deployment model would you recommend and why?

<!-- lesson: core-services | Core Services on AWS and Azure | 20 -->

Almost every cloud application is built from the same building blocks. Here they are with their AWS and Azure names.

## Compute

| Service type | AWS | Azure |
|---|---|---|
| Virtual machines | EC2 | Virtual Machines |
| Managed web apps | Elastic Beanstalk | App Service |
| Containers | ECS / EKS | Container Apps / AKS |
| Serverless functions | Lambda | Functions |

Virtual machines come in **instance types/sizes** with different CPU and memory (e.g. AWS `t3.micro`, Azure `B1s` — both available in free tiers).

## Storage

| Service type | AWS | Azure |
|---|---|---|
| Object storage (files, images, backups) | S3 | Blob Storage |
| Block storage (VM disks) | EBS | Managed Disks |
| File shares | EFS | Azure Files |
| Archive | S3 Glacier | Archive tier |

**Object storage** is the most used: you upload files into a **bucket** (AWS) or **container** (Azure) and access them by URL.

## Databases

| Type | AWS | Azure |
|---|---|---|
| Relational (MySQL, PostgreSQL, SQL Server) | RDS / Aurora | Azure SQL / Azure Database for PostgreSQL |
| NoSQL | DynamoDB | Cosmos DB |
| In-memory cache | ElastiCache | Azure Cache for Redis |

## Networking

| Concept | AWS | Azure |
|---|---|---|
| Private network | VPC | Virtual Network (VNet) |
| Firewall rules | Security Groups | Network Security Groups |
| Load balancer | Elastic Load Balancing | Load Balancer / Application Gateway |
| DNS | Route 53 | Azure DNS |
| CDN | CloudFront | Azure Front Door / CDN |

## Identity and security

- **AWS IAM** / **Microsoft Entra ID** — users, groups, roles and permissions.
- Follow the **principle of least privilege**: give each user or service only the permissions it needs.
- Turn on **multi-factor authentication (MFA)** for every account, especially the root/admin account.

## Monitoring and cost

- **CloudWatch** (AWS) / **Azure Monitor** — metrics, logs and alerts.
- Set up **billing alerts/budgets** on day one so a forgotten resource doesn't surprise you.

## A typical web architecture

```
Users → DNS → CDN → Load balancer → App servers (2+ AZs) → Managed database
                                       ↘ Object storage (images, uploads)
```

## Key takeaways

- Compute, storage, databases and networking are the core building blocks.
- AWS and Azure offer equivalent services with different names.
- Secure accounts with IAM, least privilege and MFA, and set budgets.

## Practice

Draw the architecture of an e-learning site that streams course videos: which compute, storage, database and CDN services would you use on AWS, and what are their Azure equivalents?

<!-- lesson: hands-on-deploy | Hands-on: Host a Website in the Cloud | 20 -->

In this lab you will host a static website (HTML, CSS, JS) using **object storage** — one of the cheapest and simplest ways to put a site online. Both AWS and Azure offer free-tier allowances for new accounts.

> ⚠️ Always delete resources you no longer need and set a billing budget to avoid unexpected charges.

## Prepare the site

```
my-site/
├── index.html
├── error.html
└── styles.css
```

## Option A — AWS S3 with the AWS CLI

1. Install the AWS CLI and run `aws configure` with an IAM user's access keys (not the root account).
2. Create a bucket (names are globally unique) and enable static hosting:

```bash
aws s3 mb s3://solveitly-demo-site-12345 --region ap-south-1

aws s3 website s3://solveitly-demo-site-12345 \
  --index-document index.html --error-document error.html
```

3. Allow public reads: in the S3 console turn off **Block all public access** for this bucket only, then add a bucket policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::solveitly-demo-site-12345/*"
    }
  ]
}
```

4. Upload the files:

```bash
aws s3 sync ./my-site s3://solveitly-demo-site-12345
```

5. Open `http://solveitly-demo-site-12345.s3-website.ap-south-1.amazonaws.com`.

For HTTPS and a custom domain, put **CloudFront** in front of the bucket.

## Option B — Azure Blob Storage with the Azure CLI

```bash
az login

az group create --name solveitly-rg --location centralindia

az storage account create \
  --name solveitlydemo12345 \
  --resource-group solveitly-rg \
  --sku Standard_LRS \
  --kind StorageV2

az storage blob service-properties update \
  --account-name solveitlydemo12345 \
  --static-website \
  --index-document index.html \
  --404-document error.html

az storage blob upload-batch \
  --account-name solveitlydemo12345 \
  --source ./my-site \
  --destination '$web'

az storage account show \
  --name solveitlydemo12345 \
  --query "primaryEndpoints.web" --output tsv
```

The last command prints your site's URL.

## Clean up

```bash
# AWS
aws s3 rb s3://solveitly-demo-site-12345 --force

# Azure
az group delete --name solveitly-rg --yes
```

## What about dynamic apps?

Static hosting serves files only. For apps with a back end (Node.js, Python, Java), use a **PaaS** such as Azure App Service or AWS Elastic Beanstalk, or **containers** — covered in the *DevOps Tools* course.

## Key takeaways

- Object storage + static website hosting = a cheap, scalable site.
- The CLI makes cloud setup repeatable.
- Clean up resources and watch your billing dashboard.

## Practice

Deploy your portfolio page using either option, then add a CDN (CloudFront or Azure Front Door) and compare the load time from your phone before and after.
