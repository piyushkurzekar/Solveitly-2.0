<!-- lesson: devops-culture | DevOps Culture and Lifecycle | 10 -->

**DevOps** combines software **development** (Dev) and IT **operations** (Ops). It is a culture and a set of practices that help teams deliver software **faster, more often and more reliably**.

## The problem DevOps solves

Traditionally, developers wrote code and "threw it over the wall" to operations to deploy. Releases were rare, risky and slow, and the two teams blamed each other when things broke. DevOps makes both teams share responsibility for the whole lifecycle.

## The DevOps lifecycle (the infinite loop)

```
  Plan → Code → Build → Test → Release → Deploy → Operate → Monitor
    ↑                                                          │
    └──────────────────────── feedback ────────────────────────┘
```

| Stage | Typical tools |
|---|---|
| Plan | Jira, GitHub Issues, Trello |
| Code | Git, GitHub, GitLab |
| Build | npm, Maven, Gradle, Docker |
| Test | Jest, JUnit, Selenium, Cypress |
| Release / Deploy | Jenkins, GitHub Actions, Argo CD |
| Operate | Kubernetes, Terraform, Ansible |
| Monitor | Prometheus, Grafana, ELK, CloudWatch |

## Core practices

- **Continuous Integration (CI)** — developers merge code frequently; every change is automatically built and tested.
- **Continuous Delivery / Deployment (CD)** — every change that passes tests is ready to release (delivery) or released automatically (deployment).
- **Infrastructure as Code (IaC)** — servers and networks are defined in versioned files (Terraform, CloudFormation).
- **Monitoring and logging** — measure everything and alert on problems.
- **Small, frequent releases** — smaller changes are easier to test and roll back.

## The CALMS framework

**C**ulture · **A**utomation · **L**ean · **M**easurement · **S**haring

## DORA metrics — measuring DevOps performance

1. **Deployment frequency** — how often you release.
2. **Lead time for changes** — commit to production time.
3. **Change failure rate** — % of deployments causing problems.
4. **Time to restore service** — how fast you recover from failures.

## Key takeaways

- DevOps is culture + automation, not just tools.
- CI/CD automates building, testing and releasing.
- Measure delivery with the four DORA metrics.

## Practice

Map the steps your team (or a college project) currently follows from writing code to running it in production. Which steps are manual and could be automated?

<!-- lesson: git-version-control | Version Control with Git | 15 -->

**Git** tracks every change to your code, lets many people work in parallel and makes it easy to undo mistakes. GitHub, GitLab and Bitbucket host Git repositories online.

## Setup

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

## The basic workflow

```bash
git init                      # start a repository
git status                    # see what changed
git add index.html            # stage a file (git add . stages everything)
git commit -m "Add homepage"  # save a snapshot
git log --oneline             # history
```

Files move through three areas: **working directory → staging area → repository**.

## Working with a remote

```bash
git remote add origin https://github.com/you/my-app.git
git push -u origin main       # upload commits
git pull                      # download and merge others' commits
git clone https://github.com/you/my-app.git   # copy a repository
```

## Branches

Branches let you work on a feature without affecting `main`:

```bash
git switch -c feature/login   # create and switch to a new branch
# ...edit and commit...
git push -u origin feature/login
git switch main
git merge feature/login       # merge the feature into main
git branch -d feature/login   # delete the merged branch
```

## Pull requests

In teams, you push a branch and open a **pull request (PR)** on GitHub. Teammates review the code, CI runs the tests, and the PR is merged when everything passes — the heart of collaborative DevOps.

## Resolving merge conflicts

When two branches change the same lines, Git marks the conflict:

```
<<<<<<< HEAD
<h1>Welcome to Solveitly</h1>
=======
<h1>Learn. Solve. Grow.</h1>
>>>>>>> feature/hero
```

Edit the file to keep the right version, then `git add` and `git commit`.

## Undoing things

```bash
git restore file.js              # discard uncommitted changes in a file
git restore --staged file.js     # unstage
git revert <commit-id>           # create a new commit that undoes an old one (safe for shared branches)
```

## .gitignore

```gitignore
node_modules/
dist/
.env
*.log
```

Never commit secrets like passwords or API keys.

## Key takeaways

- Commit small, logical changes with clear messages.
- Use feature branches and pull requests.
- Keep secrets and build output out of Git with `.gitignore`.

## Practice

Create a repository, make three commits on a feature branch, push it to GitHub and open a pull request into `main`.

<!-- lesson: docker | Containers with Docker | 20 -->

"It works on my machine" is a classic problem. **Docker** packages an application together with its runtime, libraries and settings into a **container** that runs the same everywhere — laptop, test server or cloud.

## Containers vs virtual machines

| Virtual machine | Container |
|---|---|
| Includes a full guest OS | Shares the host OS kernel |
| GBs in size, boots in minutes | MBs in size, starts in seconds |
| Strong isolation | Lightweight process isolation |

## Key concepts

- **Image** — a read-only template (like a class).
- **Container** — a running instance of an image (like an object).
- **Dockerfile** — instructions to build an image.
- **Registry** — a place to store images (Docker Hub, AWS ECR, Azure ACR).

## A Dockerfile for a Node.js API

```dockerfile
# 1. start from an official base image
FROM node:20-alpine

# 2. set the working directory inside the container
WORKDIR /app

# 3. install dependencies first (better layer caching)
COPY package*.json ./
RUN npm ci --omit=dev

# 4. copy the source code
COPY . .

# 5. document the port and run as a non-root user
EXPOSE 3000
USER node

# 6. the command that starts the app
CMD ["node", "server.js"]
```

Add a `.dockerignore`:

```
node_modules
.env
.git
```

## Building and running

```bash
docker build -t notes-api:1.0 .
docker run -d -p 3000:3000 --name notes -e MONGODB_URI="mongodb://..." notes-api:1.0

docker ps                 # running containers
docker logs -f notes      # follow logs
docker exec -it notes sh  # open a shell inside the container
docker stop notes && docker rm notes
```

`-p 3000:3000` maps a port on your machine to the container's port.

## Docker Compose — multi-container apps

```yaml
# docker-compose.yml
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      MONGODB_URI: mongodb://db:27017/notes
    depends_on:
      - db
  db:
    image: mongo:7
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

```bash
docker compose up -d      # start everything
docker compose down       # stop and remove
```

Containers on the same Compose network reach each other by service name (`db`).

## Pushing to a registry

```bash
docker tag notes-api:1.0 yourname/notes-api:1.0
docker push yourname/notes-api:1.0
```

## Key takeaways

- An image is the blueprint; a container is a running instance.
- Order Dockerfile steps to maximise caching and run as a non-root user.
- Docker Compose runs multi-service apps with one command.

## Practice

Containerise the notes app from the Web Development Bootcamp with a MongoDB service in `docker-compose.yml`, and confirm data survives `docker compose down` and `up` thanks to the volume.

<!-- lesson: kubernetes | Orchestration with Kubernetes | 20 -->

Running one container is easy. Running hundreds across many servers — restarting failed ones, scaling with traffic, rolling out updates without downtime — needs an **orchestrator**. **Kubernetes (K8s)** is the industry standard.

## Architecture

- **Cluster** — a set of machines (nodes) managed by Kubernetes.
- **Control plane** — the brain: API server, scheduler, controllers and etcd (cluster state).
- **Worker nodes** — run your containers via the kubelet.

## Core objects

| Object | Purpose |
|---|---|
| **Pod** | smallest unit; one or more containers sharing network and storage |
| **Deployment** | keeps a desired number of identical pods running; handles rolling updates |
| **Service** | stable network address and load balancing for a set of pods |
| **ConfigMap / Secret** | configuration and sensitive values injected into pods |
| **Ingress** | routes external HTTP traffic to services |
| **Namespace** | groups resources within a cluster |

## A Deployment

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: notes-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: notes-api
  template:
    metadata:
      labels:
        app: notes-api
    spec:
      containers:
        - name: api
          image: yourname/notes-api:1.0
          ports:
            - containerPort: 3000
          env:
            - name: MONGODB_URI
              valueFrom:
                secretKeyRef:
                  name: notes-secrets
                  key: mongodb-uri
          resources:
            requests: { cpu: "100m", memory: "128Mi" }
            limits: { cpu: "500m", memory: "256Mi" }
          readinessProbe:
            httpGet: { path: /health, port: 3000 }
```

## A Service

```yaml
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: notes-api
spec:
  selector:
    app: notes-api
  ports:
    - port: 80
      targetPort: 3000
  type: LoadBalancer
```

## kubectl essentials

```bash
kubectl create secret generic notes-secrets --from-literal=mongodb-uri="mongodb+srv://..."
kubectl apply -f deployment.yaml -f service.yaml
kubectl get pods
kubectl get services
kubectl describe pod <pod-name>
kubectl logs -f <pod-name>

kubectl scale deployment notes-api --replicas=5        # scale out
kubectl set image deployment/notes-api api=yourname/notes-api:1.1   # rolling update
kubectl rollout status deployment/notes-api
kubectl rollout undo deployment/notes-api              # roll back
```

## Self-healing and scaling

- If a pod crashes, the Deployment replaces it automatically.
- A **Horizontal Pod Autoscaler** adds or removes pods based on CPU or other metrics.

## Trying Kubernetes locally

Use **minikube**, **kind** or Docker Desktop's built-in Kubernetes. Managed clusters in the cloud: **EKS** (AWS), **AKS** (Azure), **GKE** (Google).

## Key takeaways

- Kubernetes keeps the desired state you declare in YAML.
- Deployments manage pods; Services give them a stable address.
- `kubectl apply`, `get`, `logs`, `scale` and `rollout` cover daily work.

## Practice

Deploy the notes API to minikube with 2 replicas, delete one pod and watch Kubernetes recreate it with `kubectl get pods -w`.

<!-- lesson: ci-cd-jenkins | CI/CD Pipelines with Jenkins | 20 -->

**CI/CD** automates the path from a `git push` to running software. **Jenkins** is a popular open-source automation server; pipelines are written as code in a `Jenkinsfile` stored in the repository.

## A typical pipeline

```
git push → Checkout → Install → Lint & Test → Build image → Push image → Deploy → Notify
```

If any stage fails, the pipeline stops and the team is notified — broken code never reaches production.

## Declarative Jenkinsfile

```groovy
pipeline {
    agent any

    environment {
        IMAGE = "yourname/notes-api"
        TAG   = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install & Test') {
            steps {
                sh 'npm ci'
                sh 'npm test'
            }
        }

        stage('Build image') {
            steps {
                sh 'docker build -t $IMAGE:$TAG .'
            }
        }

        stage('Push image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub',
                                                  usernameVariable: 'DOCKER_USER',
                                                  passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
                    sh 'docker push $IMAGE:$TAG'
                }
            }
        }

        stage('Deploy') {
            when { branch 'main' }
            steps {
                sh 'kubectl set image deployment/notes-api api=$IMAGE:$TAG'
                sh 'kubectl rollout status deployment/notes-api'
            }
        }
    }

    post {
        success { echo "Build ${env.BUILD_NUMBER} deployed successfully" }
        failure { echo "Build failed — check the logs" }
    }
}
```

| Part | Meaning |
|---|---|
| `agent` | where the pipeline runs |
| `environment` | variables for all stages |
| `stages` / `stage` / `steps` | the pipeline's ordered work |
| `withCredentials` | injects secrets stored in Jenkins — never hard-code passwords |
| `when` | run a stage conditionally (only deploy from `main`) |
| `post` | actions after the run (notifications, clean-up) |

## Triggering builds

- Add a **GitHub webhook** so Jenkins starts a build on every push or pull request.
- Use a **Multibranch Pipeline** job so every branch and PR gets its own pipeline automatically.

## The same idea with GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test
```

## Best practices

- Keep pipelines fast — run quick checks (lint, unit tests) first.
- Build the image **once** and promote the same artifact through test → staging → production.
- Store secrets in the CI tool's credentials store.
- Make deployments reversible (`kubectl rollout undo`, previous image tags).

## Key takeaways

- CI/CD turns every commit into a tested, deployable artifact.
- A `Jenkinsfile` versions your pipeline alongside the code.
- Secrets belong in credential stores, never in the repository.

## Practice

Write a Jenkinsfile (or GitHub Actions workflow) for the notes app that runs tests on every push, builds a Docker image tagged with the build number and only deploys from the `main` branch.
