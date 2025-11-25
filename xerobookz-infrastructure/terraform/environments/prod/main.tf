terraform {
  required_version = ">= 1.0"
  
  backend "s3" {
    bucket = "xerobookz-terraform-state"
    key    = "prod/terraform.tfstate"
    region = "us-east-1"
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# VPC Module
module "vpc" {
  source = "../../modules/vpc"

  project_name = var.project_name
  environment  = "prod"
  vpc_cidr     = "10.0.0.0/16"

  public_subnet_cidrs  = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  private_subnet_cidrs = ["10.0.10.0/24", "10.0.20.0/24", "10.0.30.0/24"]
}

# EKS Module
module "eks" {
  source = "../../modules/eks"

  project_name       = var.project_name
  environment        = "prod"
  subnet_ids         = module.vpc.private_subnet_ids
  kubernetes_version = "1.28"
  instance_types     = ["t3.large"]
  desired_size       = 3
  max_size           = 20
  min_size           = 3
  ssh_key_name       = var.ssh_key_name
}

# RDS PostgreSQL Module
module "rds_postgres" {
  source = "../../modules/rds-postgres"

  project_name        = var.project_name
  environment         = "prod"
  vpc_id              = module.vpc.vpc_id
  subnet_ids          = module.vpc.private_subnet_ids
  allowed_cidr_blocks = [module.vpc.vpc_cidr]
  master_username     = var.db_username
  master_password     = var.db_password
  instance_class      = "db.r5.xlarge"
  allocated_storage    = 500
  max_allocated_storage = 2000
  multi_az            = true
  backup_retention_period = 30
}

# ElastiCache Redis Module
module "elasticache_redis" {
  source = "../../modules/elasticache-redis"

  project_name = var.project_name
  environment  = "prod"
  vpc_id       = module.vpc.vpc_id
  subnet_ids   = module.vpc.private_subnet_ids
  node_type    = "cache.r6g.large"
  num_cache_nodes = 3
}

# S3 Module
module "s3" {
  source = "../../modules/s3"

  project_name = var.project_name
  environment  = "prod"
}

# CloudFront Module
module "cloudfront" {
  source = "../../modules/cloudfront"

  project_name = var.project_name
  environment  = "prod"
  s3_bucket_id = module.s3.bucket_id
}

