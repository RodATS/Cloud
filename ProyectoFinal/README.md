# Proyecto Final Cloud Computing - Configuración de Terraform y Minikube

## Integrantes
<li> Joaquin Casusol </li>
<li> Paolo Delgado </li>
<li> Rodrigo Torres</li>

## Descripción del proyecto
Este repositorio incluye los pasos para instalar Docker y Minikube en un entorno Linux. Y seguidamente la configuración para poder ejecutar servicios dentro de Terraform y visualizarlo a través de una interfaz gráfica para el servicio.
El servicio ofrece una interfaz intuitiva diseñada para que los usuarios puedan subir, organizar y gestionar imágenes de forma eficiente. La configuración del proyecto garantiza un entorno distribuido y escalable, implementado sobre Kubernetes y gestionado con Terraform, para asegurar alto rendimiento y confiabilidad.

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

## Instalación de Minikube
```bash
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube /usr/local/bin/
sudo snap install kubectl --classic

```
## Instalación de Terraform
Entrar a la página oficial de terraform https://developer.hashicorp.com/terraform/install Buscar la versión reciente de Terraform para Linux AMD64 y copiar el enlace de la descarga. Descomprimir el archivo y mover la carpeta a la carpeta bin.
```bash
sudo wget LINK-DE-DESCARGA
sudo unzip ARCHIVO-TERRAFORM.zip
sudo mv terraform /usr/home/bin
```


## Ejecución del proyecto:

Inicia un clúster de Minikube con tres nodos para simular un entorno Kubernetes distribuido. Habilita el registro local de contenedores dentro del clúster para almacenar imágenes Docker. Activa el servidor de métricas en Minikube para monitorear recursos y métricas del clúster. Verifica que el servidor de métricas esté habilitado correctamente y en estado funcional. Configura un túnel con socat para redirigir tráfico local al registro del clúster en Minikube. Esto permite que las imágenes Docker se publiquen en el registro.
```bash
minikube start --nodes 3
minikube addons enable registry
minikube addons enable metrics-server
kubectl get apiservice v1beta1.metrics.k8s.io -o jsonpath='{.status.conditions[0].status}'

docker run --rm -it --network=host alpine ash -c "apk add socat && socat TCP-LISTEN:5000,reuseaddr,fork TCP:$(minikube ip):5000"
```

Construye la imagen Docker para el servicio backend desde el directorio ./backend y le asigna la etiqueta backend:1.0. Etiqueta la imagen backend:1.0 para apuntar al registro local del clúster. Publica la imagen etiquetada en el registro local del clúster. Se realiza lo mismo para el frontend


```bash
docker build -t backend:1.0 ./backend
docker tag backend:1.0 localhost:5000/backend:1.0
docker push localhost:5000/backend:1.0

docker build -t frontend:1.0 ./frontend
docker tag frontend:1.0 localhost:5000/frontend:1.0
docker push localhost:5000/frontend:1.0
```


## Inicializar Terraform:
Inicializa Terraform, descarga los proveedores necesarios y configura el entorno para gestionar los recursos definidos en el proyecto.
Aplica las configuraciones de Terraform para desplegar los servicios y recursos en el clúster Kubernetes.
Lista todos los recursos creados en el espacio de nombres (namespace) app, verificando que los servicios, pods, y deployments estén funcionando.
```bash
terraform init
terraform apply
kubectl get all -n app
```

## Revisar el estado de los servicios y obtener la url:
Muestra los pods en ejecución, verificando su estado y asegurándose de que todos estén en funcionamiento.
Lista los servicios expuestos en el clúster, mostrando información como las IPs y puertos.
Recupera la URL pública para acceder al servicio frontend-service. Esto permite interactuar con la aplicación web desde un navegador o cliente externo.
```bash
kubectl get pods
kubectl get services
minikube service frontend-service --url
```
