# main.tf
provider "kubernetes" {
  config_path = "~/.kube/config"
}

resource "kubernetes_namespace" "app_namespace" {
  metadata {
    name = "app"
  }
}

module "frontend" {
  source    = "./kubernetes_resources/frontend"
  namespace = kubernetes_namespace.app_namespace.metadata[0].name
}

module "backend" {
  source    = "./kubernetes_resources/backend"
  namespace = kubernetes_namespace.app_namespace.metadata[0].name
}

# El resto de los módulos y recursos como HPA, etc.

