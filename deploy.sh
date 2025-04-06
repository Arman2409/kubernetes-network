#!/bin/bash
set -e

echo "🚀 Deploying Database..."
docker build ./database -t database
kubectl apply -f ./database/database-service.yaml
kubectl apply -f ./database/database-deployment.yaml

echo "🚀 Deploying Server..."
docker build ./server -t server
kubectl apply -f ./server/server-service.yaml
kubectl apply -f ./server/server-deployment.yaml

echo "🚀 Deploying Client..."
docker build ./client -t client
kubectl apply -f ./client/client-service.yaml
kubectl apply -f ./client/client-deployment.yaml