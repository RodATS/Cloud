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
