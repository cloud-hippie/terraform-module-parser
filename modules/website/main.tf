terraform {
    required_version = ">= 0.12.0"
    required_providers {
        aws = ">= 2.0.0"
    }
}

provider "aws" {
    region = "us-east-1"
}

resource "aws_s3_bucket" "new_bucket" {
    bucket = "${var.website_name}"
    acl    = "private"
}


