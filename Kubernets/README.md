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
Agregar en cada carpeta los archivos correspondientes. Revisar la carpeta "proyectoKubernets". (puedes descargar el git o crear los archivos manualmente con (`nano`).
```bash
mkdir proyectoKubernets
cd proyectoKubernets
mkdir backend frontend
cd backend
```
## Creación de kubernets con 3 nodos
```bash
sudo systemctl start docker
sudo systemctl enable docker
minikube start --nodes=3 --driver=Docker
minikube addons enable registry
minikube addons list | grep registry
kubectl get svc --namespace kube-system
docker run --rm -it --network=host alpine ash -c "apk add socat && socat TCP-LISTEN:5000,reuseaddr,fork TCP:$(minikube ip):5000"
```

## Construcción de Dockerfile y Upload de las imágenes
En una terminal nueva:
```bash
cd /mi-proyecto
cd backend
docker build -t backend/backend-image .
docker tag backend/backend-image localhost:5000/backend-image
docker push localhost:5000/ backend/backend-image
```
En otra terminal:
```bash
cd /mi-proyecto
cd frontend
docker build -t frontend-image .
docker tag frontend/frontend-image localhost:5000/frontend-image
docker push localhost:5000/frontend-image
```

## Carga de imágenes a los contenendores y creación de servicios
El último comando imprimirá la dirección de la página creada, copiar y pegar en el navegador.
```bash
cd /mi-proyecto
kubectl apply -f k8s-deployment.yaml
kubectl get pods
minikube service frontend –url
```

## Escalabilidad
Para mostrar la escalibilidad que nos ofrece kubernets uno le puede indicar que servicio se le hará el cambio en este caso "frontend" y se le indica la cantidad a escalar.
```bash
kubectl scale deployment frontend --replicas=6
kubectl get deployments
```
