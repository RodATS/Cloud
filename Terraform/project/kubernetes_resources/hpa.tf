resource "kubernetes_horizontal_pod_autoscaler" "backend_hpa" {
  metadata {
    name      = "backend-hpa"
    namespace = kubernetes_namespace.app_namespace.metadata[0].name
  }

  spec {
    scale_target_ref {
      api_version = "apps/v1"
      kind        = "Deployment"
      name        = kubernetes_deployment.backend.metadata[0].name
    }

    min_replicas = 2
    max_replicas = 6

    metric {
      type = "Resource"
      resource {
        name = "cpu"
        target {
          type               = "Utilization"
          average_utilization = 50
        }
      }
    }
  }
}
