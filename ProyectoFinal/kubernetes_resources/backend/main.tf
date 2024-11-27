resource "kubernetes_deployment" "backend" {
  metadata {
    name      = "backend-deployment"
    namespace = var.namespace  # Aquí usas la variable "namespace"
  }

  spec {
    replicas = 2
    selector {
      match_labels = {
        "app" = "backend"
      }
    }
    template {
      metadata {
        labels = {
          "app" = "backend"
        }
      }
      spec {
        container {
          name  = "backend"
          image = "localhost:5000/backend:1.0"
          port {
            container_port = 8080
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "backend_service" {
  metadata {
    name      = "backend-service"
    namespace = var.namespace  # Aquí usas la variable "namespace"
  }

  spec {
    selector = {
      "app" = "backend"
    }
    port {
      port        = 8080
      target_port = 8080
      protocol    = "TCP"
      node_port   = 30080  # Puerto NodePort especificado
    }
    type = "NodePort"  # Tipo de servicio NodePort
  }
}

