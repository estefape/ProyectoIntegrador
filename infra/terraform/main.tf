terraform {
  backend "s3" {
    bucket = "comision3-equipo3"
    key = "terraform/terraform.tfstate"
    region = "us-east-2"
  }
}

resource "aws_s3_bucket" "frontend_bucket" {
  bucket = "frontend-c3-equipo3"

  tags = {
    team = "equipo3"
  }
}

resource "aws_s3_bucket_acl" "frontend_bucket_acl" {

  bucket = aws_s3_bucket.frontend_bucket.id

  grant {
    type        = "Group"
    uri         = "http://acs.amazonaws.com/groups/global/AllUsers"
    permissions = "READ"
  }
}
