## transfer image to worker nodes
docker build -t nodejs-app:1.0.0 .
docker save -o nodejs-app.tar nodejs-app:1.0.0
scp nodejs-app.tar oracle9@10.10.10.109:/tmp/
scp nodejs-app.tar oracle9@10.10.10.110:/tmp/
docker load -i /tmp/flask-login-app.tar ## wrong
ctr -n k8s.io images import /tmp/nodejs-app.tar