# rancher
# Port using till now for checking

sudo ss -tuln |grep 443

sudo netstat -tuln |grep 443
# First day lab:
helm install nginx-demo ./nginx-demo --namespace prd-web --create-namespace

kubectl get pods -n prd-web
kubectl get svc -n prd-web

# Now removed deployment from rancher --> works 
# But we have delete svc manually
# For redeploy with helm

[root@ol9-admin-01 rancher]# helm uninstall nginx-demo -n prd-web
release "nginx-demo" uninstalled
[root@ol9-admin-01 rancher]#

helm install nginx-demo ./nginx-demo --namespace prd-web --create-namespace

# You might notice svc set different port even though you mentioned 30080
# for the quick solution patch

kubectl patch svc nginx-demo -n prd-web -p '{"spec": {"ports": [{"port": 80, "nodePort": 30080, "protocol": "TCP", "targetPort": 80}]}}'

# Next project:

+-------------------+          +-----------------------+
|   Developer       |          |     GitHub Actions     |
|  (Push Code)      | -------->|   CI: Build, Test,    |
+-------------------+          |   Scan, Push Image    |
                               +-----------+-----------+
                                           |
                                           v
                             +---------------------------+
                             |     Container Registry     |
                             |  (Docker Hub, GHCR, etc.)  |
                             +------------+--------------+
                                          |
                                          v
                             +---------------------------+
                             |     GitOps Repo           |
                             |  (Manifests / Helm charts)|
                             +------------+--------------+
                                          |
                        +-----------------+-----------------+
                        |                                   |
                        v                                   v
+-----------------------------+              +----------------------------+
|  GitHub Actions CD Workflow |              |         ArgoCD              |
| (Update manifests, PRs)     |-------------->| Watches GitOps repo        |
+-----------------------------+              | Syncs to Kubernetes cluster|
                                             +------------+---------------+
                                                          |
                                                          v
                                  +----------------------------------+
                                  | Rancher Managed Kubernetes       |
                                  | Cluster with Projects:           |
                                  | - dev                           |
                                  | - staging                       |
                                  | - prod                          |
                                  +---------------+------------------+
                                                  |
                                  +---------------+-------------------+
                                  | Ingress Controller (Nginx/Traefik)|
                                  | cert-manager for TLS              |
                                  +---------------------------------+
                                                  |
                                  +---------------+-------------------+
                                  |   Monitoring & Alerts             |
                                  | Prometheus + Grafana + Alerting  |
                                  +---------------------------------+

# Environment Promotion Flow (Simplified):
Dev environment (Rancher Project)
          |
          | -- QA, manual tests, automated tests
          v
Staging environment (Rancher Project)
          |
          | -- Final validation
          v
Production environment (Rancher Project)

# Build image
docker build -t simple-static-web:1.0.1 .

# Docker login from admin server
docker login 10.10.10.116:8083


# tag image with my private docker repo
docker tag simple-static-web:latest 10.10.10.116:8083/simple-static-web:1.0.0

# push to my private repo
docker push 10.10.10.116:8083/simple-static-web:1.0.0

# check gitaction runner
sudo systemctl status actions.runner.gokulbanik-rancher.ol9-admin-01.service

# gitaction runner tag or lebel
Enter the name of runner: [press Enter for ol9-admin-01]

This runner will have the following labels: 'self-hosted', 'Linux', 'X64'
Enter any additional labels (ex. label-1,label-2): [press Enter to skip]

√ Runner successfully added

## validate scripts 
helm template ./dev --values ./dev/values.yaml --namespace dev-web --debug

# Manual deploy 

kubectl run image-test \
  --rm -i --tty \
  --image=10.10.10.116:8083/simple-static-web:1.0.1 \
  --image-pull-policy=Always \
  --overrides='{"spec":{"imagePullSecrets":[{"name":"nexus-registry-secret"}]}}' \
  -n dev-web -- bash

# Argocd login

argocd login 192.168.0.43:8443 --username admin --password Passw0rd1 --insecure
argocd app delete argocd/dev-web --cascade
argocd app create -f helm-apps/$app/app.yaml || argocd app sync $app;

# check ports
sudo netstat -tulnp | grep 30080
sudo ss -tulnp | grep 30080
kubectl get svc -A | grep 30080

# for dry run
kubectl apply --dry-run=client -f deployment.yaml

kubectl -n dev-web rollout restart deploy simple-static-web


# Docker Auth
[root@ol9-admin-01 ~]# cat .docker/config.json
{
        "auths": {
                "10.10.10.116:8083": {
                        "auth": "YWRtaW46MTIzNDU2"
                },
                "https://index.docker.io/v1/": {
                        "auth": "Z29rdWxkb2NrZXIyMDA4OmRja3JfcGF0X2k1aTBGenRlcHpnVkdkWFJTOWR3TV9RSUUwUQ=="
                }
        }
cat ~/.docker/config.json | base64 -w0

# Manually transfer the images

ctr -n k8s.io images ls | grep simple
# Git:
git checkout -b dev origin/dev
git push --set-upstream origin future
git branch  
git ls-remote --heads origin 
git push origin --delete
git tag -d v1.0.0
git push origin :refs/tags/v1.0.0
git tag v1.0.0
git push origin v1.0.0
# delete local tags
git tag -l | xargs git tag -d
# Delete all remote tags
git push --delete origin v1.0.0
# delete local tags
git tag -d v1.0.0
# verify
git fetch --tags
git tag -l

# Push a fresh tag
git tag v1.0.0
git push origin v1.0.0

Curretn setup:

External clients → HAProxy → NodePort (Ingress Controller) → Ingress → ClusterIP (App)

                     ┌─────────────────────────────┐
                     │       External Clients      │
                     │   (Browser, API, etc.)      │
                     └─────────────┬──────────-────┘
                                   │  HTTP/HTTPS 80/443
                                   ▼
                     ┌────────────────────────────-----─┐
                     │          HAProxy 192.168.0.75    │
                     │  (Reverse Proxy / Load Balancer) |  
                     │   Host-based routing             │
                     │   Forward to NodePort 32741      │
                     └─────────────┬──────────────------┘
                                   │
                                   ▼
                     ┌─────────────────────────────┐
                     │ Kubernetes Node (any)       │
                     │ NodePort: 32741             │
                     │ Ingress Controller: nginx   │
                     │ Listens on 80/443           │
                     └─────────────┬───────────-───┘
                                   │
              ┌────────────────────┴───────────------------─────────┐
              │                                                     │
   ┌──────────▼──────------------────┐                     ┌────────▼───---------------──────┐
   │ Namespace: dev-web              │                     │ Namespace: prd-web              │
   │ Ingress: dev-web-ingress        │                     │ Ingress: prd-web-ingress        │
   │ Path: /dev-web                  │                     │ Path: /prd-web                  │
   │ Service: dev-web-svc │ Port: 80 |                     │ Service: prd-web-svc │ Port: 80 |
   └──────────┬─────────------------─┘                     └─────────┬───────--------------──┘
              │                                                      │
   ┌──────────▼──────────┐                                  ┌────────▼──--───────┐
   │ Pod(s) dev-web      │                                  │ Pod(s) prd-web     │
   │ Container: web app  │ Port: 80                         │ Container: web app │ Port: 80
   └─────────────────────┘                                  └─────────────────---┘

Cloud setup:

External client → Cloud LoadBalancer → App Service → Pod