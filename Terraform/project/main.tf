provider "kubernetes" {
  config_path = "~/.kube/config"
}

# Namespace para organizar los recursos
resource "kubernetes_namespace" "app_namespace" {
  metadata {
    name = "app"
  }
}

# Cargar módulos para backend, frontend y HPA
module "backend" {
  source = "./kubernetes_resources/backend-deployment.tf"
}

module "frontend" {
  source = "./kubernetes_resources/frontend-deployment.tf"
}

module "hpa" {
  source = "./kubernetes_resources/hpa.tf"
}
