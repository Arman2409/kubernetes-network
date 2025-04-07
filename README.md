# Quote Generator

A Kubernetes-based application composed of three pods: a React client, a Go server, and a PostgreSQL database. The app functions as a quote generator.

## Run locally with Kubernetes

1. Install necessary software.

- [Kubernetes](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/)
- [Minikube](https://minikube.sigs.k8s.io/docs/start/?arch=%2Flinux%2Fx86-64%2Fstable%2Fbinary+download)
- [Docker](https://docs.docker.com/engine/install/)

2. Start your cluster.
```bash
  minikube start
```

3. Set your Docker environment to Minikube.
```bash
  eval $(minikube docker-env)
```

4. Build the docker containers and publish the services and deployments using this commands.You can find the separate commands in ./deploy.sh file.
   Note: the Docker container names used in the file are used for deployments.
```bash
  chmod +x deploy.sh;
  ./deploy.sh
```

5. Find the address of your client service and access the client in the browser.
```bash
  minikube service client-service --url
```
