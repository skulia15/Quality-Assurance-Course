# Top of file
variable "environment" {
  type = "string"
}

# Declare aws as the provider for terraform.
# Tell terraform the location of our credentials file in order to run commands on aws.
# Tell terraform which region we are using.
provider "aws" {
  shared_credentials_file = "~/.aws/credentials"
  region                  = "us-east-1"
}

# Define a security group for the instance with the name GameSecurityGroup.
# This configures the connections for the instance. Which ports and networking protocol to use.
resource "aws_security_group" "game_security_group" {
  name   = "GameSecurityGroup_${var.environment}"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Tell terraform to create a asw instance caller game_server.
# The instance is created using the provided Amazon Machine Image
# Declare we will be using GameKeyPair as the key name
resource "aws_instance" "game_server" {
  ami                    = "ami-0ac019f4fcb7cb7e6"
  instance_type          = "t2.micro"
  key_name               = "GameKeyPair"
  vpc_security_group_ids = ["${aws_security_group.game_security_group.id}"]
  tags {
    Name = "GameServer_${var.environment}"
  }
  # Moves the initialize game script from our local machine to the home directory of our instance with ssh connection.
  provisioner "file" {
    source      = "scripts/initialize_game_api_instance.sh"
    destination = "/home/ubuntu/initialize_game_api_instance.sh"

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = "${file("~/.aws/GameKeyPair.pem")}"
    }
  }

  # Moves the docker compose file from our local machine to the home directory of our instance with ssh connection.
  provisioner "file" {
    source      = "docker-compose.yml"
    destination = "/home/ubuntu/docker-compose.yml"

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = "${file("~/.aws/GameKeyPair.pem")}"
    }
  }

  # Moves the docker compose up script to the home directory of our instance with ssh connection.
  provisioner "file" {
    source      = "scripts/docker_compose_up.sh"
    destination = "/home/ubuntu/docker_compose_up.sh"

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = "${file("~/.aws/GameKeyPair.pem")}"
    }
  }
  # This is used to run commands on the instance we just created.
  # Terraform does this by SSHing into the instance and then executing the commands.
  # Since it can take time for the SSH agent on machine to start up we let Terraform
  # handle the retry logic, it will try to connect to the agent until it is available
  # that way we know the instance is available through SSH after Terraform finishes.
  
  # Invokes a script on a remote resource after it is created. Make the script executable using chmod.
  provisioner "remote-exec" {
    inline = [
      "chmod +x /home/ubuntu/initialize_game_api_instance.sh",
      "chmod +x /home/ubuntu/docker_compose_up.sh",
    ]

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = "${file("~/.aws/GameKeyPair.pem")}"
    }
  }
}

# Outputs the public IP of the server.
output "public_ip" {
  value = "${aws_instance.game_server.public_ip}"
}