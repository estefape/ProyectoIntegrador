terraform {
  backend "s3" {
    bucket = "comision3-equipo3"
    key = "terraform/terraform.tfstate"
    region = "us-east-2"
  }
}

# ..... S3 ..... #
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

resource "aws_s3_bucket_policy" "frontend_bucket_policy" {
  bucket = aws_s3_bucket.frontend_bucket.id

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::${aws_s3_bucket.frontend_bucket.id}/*"
    }
  ]
}
EOF
}

data "aws_vpc" "default_vpc" {
  default = true
}

# ..... IP ..... #
resource "aws_eip" "elastic_ip" {
  vpc   = true

  tags  = {
    Name = "ip-c3-equipo3"
    team = "equipo3"
  }
}

# ..... EC2 ..... #
resource "aws_instance" "backend_instance" {
  ami           = "ami-0430580de6244e02e" // Ubuntu Server 20.04 LTS
  instance_type = var.instance_type
  subnet_id     = "subnet-07388b09d5835ee84"

  tags  = {
    Name = "backend-c3-equipo3"
    team = "equipo3"
  }

  //vpc_security_group_ids = [
  //  aws_security_group.backend.id
  //]
}

resource "aws_eip_association" "eip_assoc" {
  instance_id   = aws_instance.backend_instance.id
  allocation_id = aws_eip.elastic_ip.id
}

# ..... Security group ..... #
resource "aws_security_group" "backend" {
  name   = "security-group-equipo3"
  vpc_id = data.aws_vpc.default_vpc.id

  ingress {
    from_port   = 22
    protocol    = "tcp"
    to_port     = 22
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 80
    protocol    = "tcp"
    to_port     = 80
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    protocol    = "-1"
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}
