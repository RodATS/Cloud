# Proyecto - Configuración de Terraform y Minikube

Este repositorio incluye los pasos básicos para instalar Docker y Minikube en un entorno Linux.

## Requisitos previos

- Un sistema basado en Linux (probado en Ubuntu).
- Permisos de superusuario (`sudo`).

## Instalación de Docker

Sigue estos pasos para instalar Docker:

```bash
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common 
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg 
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null 
sudo apt update 
sudo apt install docker-ce 
sudo systemctl start docker          # Inicia el servicio de Docker
sudo systemctl enable docker         # Habilita Docker para que inicie en el arranque
sudo usermod -aG docker $USER
sudo systemctl status Docker

```

## Instalacioón de Minikube
```bash
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube /usr/local/bin/
sudo snap install kubectl --classic

```

## Ejecución del proyecto:

```bash
minikube start --nodes 3
minikube addons enable registry
minikube addons enable metrics-server
kubectl get apiservice v1beta1.metrics.k8s.io -o jsonpath='{.status.conditions[0].status}'

docker run --rm -it --network=host alpine ash -c "apk add socat && socat TCP-LISTEN:5000,reuseaddr,fork TCP:$(minikube ip):5000"

docker build -t backend:1.0 ./backend
docker tag backend:1.0 localhost:5000/backend:1.0
docker push localhost:5000/backend:1.0

docker build -t frontend:1.0 ./frontend
docker tag frontend:1.0 localhost:5000/frontend:1.0
docker push localhost:5000/frontend:1.0
```


## Inicializar Terraform:
```bash
terraform init
terraform apply
kubectl get all -n app
```

## Revisar el estado de los servicios y obtener la url:
```bash
kubectl get pods
kubectl get services
minikube service frontend-service --url
```