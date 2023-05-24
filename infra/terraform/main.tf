terraform {
  backend "s3" {
    bucket = "comision3-equipo3"
    key = "terraform/terraform.tfstate"
    region = "us-east-2"
  }
}

resource "aws_s3_bucket" "frontend_bucket" {
  bucket = "frontend-c3-equipo3"

  tags   = {
    team = "equipo3"
  }
}

resource "aws_s3_bucket_public_access_block" "frontend_public_access" {

  bucket = aws_s3_bucket.frontend_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

data "aws_vpc" "default_vpc" {
  default = true
}

data "aws_subnet" "public_subnets" {
  vpc_id = data.aws_vpc.default_vpc.id
  filter {
    name   = "map-public-ip-on-launch"
    values = ["true"]
  }
}

resource "aws_eip" "elastic_ip" {
  vpc   = true

  tags  = {
    team = "equipo3"
  }
}

resource "aws_instance" "backend_instance" {
  ami           = "ami-0430580de6244e02e" // Ubuntu Server 20.04 LTS
  instance_type = "t2.micro"
  subnet_id     = data.aws_subnet.public_subnets.id

  tags  = {
    team = "equipo3"
  }

}

resource "aws_eip_association" "eip_assoc" {
  instance_id   = aws_instance.backend_instance.id
  allocation_id = aws_eip.elastic_ip.id
}