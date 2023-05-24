terraform {
  backend "s3" {
    bucket = "comision3-equipo3"
    key = "terraform/terraform.tfstate"
    region = "us-east-2"
  }
}

resource "aws_s3_bucket" "frontend_bucket" {
  bucket = "frontend-c3-equipo3"

  # Public access
  acl    = "public-read"
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::frontend-c3-equipo3/*"
    }
  ]
}
EOF
}