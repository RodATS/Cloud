# frontend/main.tf

resource "kubernetes_deployment" "frontend" {
  metadata {
    name      = "frontend-deployment"
    namespace = var.namespace  # Aquí usas la variable "namespace"
  }

  spec {
    replicas = 2
    selector {
      match_labels = {
        "app" = "frontend"
      }
    }
    template {
      metadata {
        labels = {
          "app" = "frontend"
        }
      }
      spec {
        container {
          name  = "frontend"
          image = "localhost:5000/frontend:1.0"
          port {
            container_port = 80
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "frontend_service" {
  metadata {
    name      = "frontend-service"
    namespace = var.namespace  # Aquí usas la variable "namespace"
  }

  spec {
    selector = {
      "app" = "frontend"
    }
    port {
      port        = 80
      target_port = 80
      protocol    = "TCP"
    }
    type = "ClusterIP"
  }
}

