# Proyecto - Configuración de Docker y Minikube

Este repositorio incluye los pasos básicos para instalar Docker y Minikube en un entorno Linux.

## Requisitos previos

- Un sistema basado en Linux (probado en Ubuntu).
- Permisos de superusuario (`sudo`).

## Instalación de Docker

Sigue estos pasos para instalar Docker:

```bash
sudo apt update
sudo apt install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
```

##Instalacioón de Minikube
```bash
curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube /usr/local/bin/
```

##Crear Cluster con 3 nodos
```bash
minikube start --nodes=3 --driver=docker
```
Instalación de los paquetes faltantes
```bash
sudo snap install kubectl --classic
minikube addons enable registry
kubectl create namespace registry
kubectl apply -f https://raw.githubusercontent.com/kubernetes/minikube/master/deploy/addons/registry/registry-deployment.yaml
kubectl get svc -n registry

```
