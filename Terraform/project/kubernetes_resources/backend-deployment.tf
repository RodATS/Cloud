resource "kubernetes_deployment" "backend" {
  metadata {
    name      = "backend-deployment"
    namespace = kubernetes_namespace.app_namespace.metadata[0].name
  }

  spec {
    replicas = 2
    selector {
      match_labels = {
        app = "backend"
      }
    }

    template {
      metadata {
        labels = {
          app = "backend"
        }
      }

      spec {
        container {
          image = var.backend_image
          name  = "backend"

          resources {
            requests = {
              cpu    = "100m"
              memory = "128Mi"
            }
            limits = {
              cpu    = "500m"
              memory = "256Mi"
            }
          }

          ports {
            container_port = 8080
          }
        }
      }
    }
  }
}
