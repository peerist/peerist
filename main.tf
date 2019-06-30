variable "docker_host" {
  default = "unix:///var/run/docker.sock"
}

provider "docker" {
  host = "${var.docker_host}"
}

resource "random_string" "admin_secret" {
  length = 32
  special = false
}

resource "docker_image" "hasura" {
  name = "hasura/graphql-engine:latest"
}

resource "docker_image" "postgres" {
  name = "postgres:10.5"
}

resource "docker_image" "caddy" {
  name = "abiosoft/caddy:0.11.0"
}

resource "docker_network" "db" {
  name = "db"
}

resource "docker_network" "proxy" {
  name = "proxy"
}

resource "docker_container" "postgres" {
  image = "${docker_image.postgres.latest}"
  name = "postgres"
  hostname = "postgres"
  restart = "always"

  ports {
    internal = 5432
    external = 5432
  }

  volumes {
    volume_name = "db_data"
    container_path = "/var/lib/postgresql/data"
  }

  networks_advanced {
    name = "${docker_network.db.name}"
  }
}

resource "docker_container" "graphql-engine" {
  image = "${docker_image.hasura.latest}"
  name = "graphql-engine"
  hostname = "graphql-engine"
  restart = "always"
  env = [
    "HASURA_GRAPHQL_DATABASE_URL=postgres://postgres:@postgres:5432/postgres",
    "HASURA_GRAPHQL_ENABLE_CONSOLE=false",
    "HASURA_GRAPHQL_ADMIN_SECRET=${random_string.admin_secret.result}"
  ]
  command = ["graphql-engine", "serve"]
  depends_on = [ docker_container.postgres ]

  networks_advanced {
    name = "${docker_network.db.name}"
  }

  networks_advanced {
    name = "${docker_network.proxy.name}"
  }
}

resource "docker_container" "caddy" {
  image = "${docker_image.caddy.latest}"
  name = "caddy"
  restart = "always"
  depends_on = [ docker_container.graphql-engine ]

  ports {
    internal = 80
    external = 8080
  }

  ports {
    internal = 443
    external = 443
  }

  volumes {
    host_path = "${path.cwd}/Caddyfile"
    container_path = "/etc/Caddyfile"
  }

  volumes {
    volume_name = "caddy_certs"
    container_path = "/root/.caddy"
  }

  networks_advanced {
    name = "${docker_network.proxy.name}"
  }
}

output "admin_secret" {
  value = random_string.admin_secret.result
}