# rancher

Port using till now for checking

[root@ol9-admin-01 devops]# sudo ss -tuln

[root@ol9-admin-01 devops]# sudo netstat -tuln
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

