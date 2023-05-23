terraform {
  backend "s3" {
    bucket = "comision3-equipo3"
    key = "terraform/terraform.tfstate"
    region = var.aws_region
  }
}