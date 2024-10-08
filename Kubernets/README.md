# Proyecto - Configuración de Docker y Minikube

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

## Creamos Carpetas
Agregar en cada carpeta los archivos correspondientes. Revisar la carpeta 
```bash
mkdir proyectoKubernets
cd proyectoKubernets
mkdir backend frontend k8s
cd backend
```
##Creación de archivos para el backend
```bash
nano app.py
nano Dockerfile
```
