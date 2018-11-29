#!/bin/bash
# 1. It should destroy any running Terraform managed instances.
# 2. Create a new instance using Terraform.
# 3. Run the initialization script on the new instance.
# 4. It should run without the user being prompted for approval.

# Check if docker compose file exist
if [ ! -f "docker-compose.yml" ]; then
    echo "Error: docker-compose file is missing! Check if you are running the script from the correct location."
    exit 1
fi
# Check for infrastructure file
if [ ! -f "infrastructure.tf" ]; then
    echo "Error: Infrastructure file is missing! Check if you are running the script from the correct location."
    exit 1
fi
# Check for initialize_game script
if [ ! -f "./scripts/initialize_game_api_instance.sh" ]; then
    echo "Error: Initialization script is missing! Check if you are running the script from the correct location."
    exit 1
fi
# Check for keyfile 
if [ ! -f "`echo $HOME`/.aws/GameKeyPair.pem" ]; then
    echo "Error: GameKeyPair is missing from .aws! Make sure that the keypair is present in ~/.aws"
    exit 1
fi


echo "Deployment script started."
# Destroy any running Terraform managed instances.
echo "Attempting to destroy any terraform running instances."
terraform destroy -auto-approve
# Create a new instance using Terraform.
echo "Creating a new instance using Terraform"
terraform init
echo "Deploying the created instance."
terraform apply -auto-approve
echo "Runing the initialization script on the new instance."
chmod 400 ~/.aws/GameKeyPair.pem
ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(terraform output public_ip) "./initialize_game_api_instance.sh"

echo "Deployment complete!"