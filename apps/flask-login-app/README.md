## transfer image to worker nodes
docker save -o flask-login-app.tar flask-login-app:1.0
scp flask-login-app.tar oracle9@10.10.10.109:/tmp/
scp flask-login-app.tar oracle9@10.10.10.110:/tmp/
docker load -i /tmp/flask-login-app.tar
docker images | grep flask-login-app

