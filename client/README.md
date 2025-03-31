# Client

### Client side of the project

## Run locally with Kubernetes

1. Install and set up Kubernetes[https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/].

2. Set up your local cluster. In this documentation minikube is used.[https://minikube.sigs.k8s.io/docs/start/?arch=%2Flinux%2Fx86-64%2Fstable%2Fbinary+download].

3. Install and set up Docker[https://docs.docker.com/engine/install/]

4. Set your Docker environment to Minikube.
```bash
  eval $(minikube docker-env)
```

5. Build the Docker image (this image name is used in the deployment).
```bash
  docker build ./ -t client
```

6. Start your cluster
```bash
  minikube start
```

7. Apply the service file
```bash
 kubectl apply -f client-service.yaml 
```

8. Apply the deployment file
```bash
  kubectl apply -f client-deployment.yaml 
```

9. Find the exposed NodePort by this command
```bash
   kubectl describe service client
```

10. Get your pod cluster local IP
```bash
   minikube ip
```

11. Access the client in the browser using cluster's IP and the Node port
<cluster ip>:<node port>


## How to run locally

1. Install and set up Node.js[https://nodejs.org/en/download]

2. Install the dependencies
```bash
  npm install
```

3. Run the project
```bash
  npm run start
```
