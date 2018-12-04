#!/bin/bash

# Define the date format for start/end times 
nice_date_format="+%Y-%m-%d %H:%M:%S, %3Nms"

# Display start time of the script using the defined date format
# Tee creates a new file and adds the output to stdout and to a logfile, -a appends the output instead of creating a new file.
printf "Time of start: $(date "$nice_date_format")\n\n" | tee logfile.txt

# Welcome the current user. whoami displays the current user
currentUser=$(whoami)
printf "Welcome $currentUser, This script checks if you have the necessary tools and OS for the hgop course \n\n" | tee -a logfile.txt
# Display current users linux version
#printf "You are running Bash in version $BASH_VERSION \n\n"

# Failsafe way to get OS and version. 
# Credit: https://unix.stackexchange.com/questions/6345/how-can-i-get-distribution-name-and-version-number-in-a-simple-shell-script
# Checks release in the os-release file, if it exists
if [ -f /etc/os-release ]; then
    # Execute commands from the file /etc/os-release
    . /etc/os-release
    # Gets the variables from the file
    OS=$NAME
    VER=$VERSION_ID
# # else get it from lsb_release if able to type it out
elif type lsb_release >/dev/null 2>&1; then
    # for linuxbase.org
    # Gets the variables from the file
    OS=$(lsb_release -si)
    VER=$(lsb_release -sr)
# else get the variables from the lsb_release file
elif [ -f /etc/lsb-release ]; then
    # For some versions of Debian/Ubuntu without lsb_release command
    # Execute commands from the file /etc/os-release
    . /etc/lsb-release
    # Gets the variables from lsb_release
    OS=$DISTRIB_ID
    VER=$DISTRIB_RELEASE
else
    # Fall back to uname, e.g. "Linux <version>", also works for BSD, etc.
    # Gets OS and Version from executing the uname command with appropriate parameters
    OS=$(uname -s)
    VER=$(uname -r)
fi

# var="$(printf "FORMAT" var1)"
# Environment verification
printf "Checking if you have installed the necessary tools!\n\n" | tee -a logfile.txt
# Check if operating system is ubuntu or OsX Darwin
if [ $OS == "Ubuntu" ] || [$OS = "Darwin    " ]; then
    printf "Your Linux system, $OS $VER fits the requirements\n" | tee -a logfile.txt
else 
    printf "You do not have the required OS. Ubuntu or OsX are supported\n\n" | tee -a logfile.txt
fi
# Check for precence of Curl
if ! [ -x "$(command -v git)" ]; then
    # Git is not installd
    printf '[ERROR]: curl is not installed.\n' | tee -a logfile.txt
    # Curl installation commands
    bash -c "sudo apt-get update"
    bash -c "sudo apt-get upgrade"
    printf "[Installing curl]\n" | tee -a logfile.txt
    bash -c "sudo apt-get install curl"
else 
    # Run git version command
    OUTPUT="$(curl --version)"
    printf "Curl: Installed\n" | tee -a logfile.txt
fi
# Check for precence of Git
if ! [ -x "$(command -v git)" ]; then
    # Git is not installd
    printf '[ERROR]: git is not installed.\n' | tee -a logfile.txt
    # Git installation commands
    bash -c "sudo apt-get update"
    bash -c "sudo apt-get upgrade"
    printf "[Installing Git]\n" | tee -a logfile.txt
    bash -c "sudo apt-get install git"
else 
    # Run git version command
    OUTPUT="$(git --version)"
    printf "Git: ${OUTPUT}\n" | tee -a logfile.txt
fi
# Check for precence of Npm
if ! [ -x "$(command -v npm)" ]; then
    # Npm is not installed 
    printf '[ERROR]: Npm is not installed.\n' | tee -a logfile.txt
    # Npm installation commands
    bash -c "sudo apt-get update"
    bash -c "sudo apt-get upgrade"
    printf "[Installing Npm]\n" | tee -a logfile.txt
    bash -c "sudo apt-get install npm"
else
    # Run npm version command
    OUTPUT="$(npm --version)"
    printf "Npm: ${OUTPUT}\n" | tee -a logfile.txt
fi
# Check for precence of Yarn
if ! [ -x "$(command -v yarn)" ]; then
    # Yarn is not installed 
    printf '[ERROR]: Yarn is not installed.\n' | tee -a logfile.txt
    # Yarn installation commands
    bash -c "sudo apt-get update"
    bash -c "sudo apt-get upgrade"
    printf "[Installing Yarn]\n" | tee -a logfile.txt
    bash -c "sudo apt-get install yarn"
else
    # Run Yarn version command
    OUTPUT="$(yarn --version)"
    printf "Yarn: ${OUTPUT}\n" | tee -a logfile.txt
fi
# Check for precence of NodeJS
if ! [ -x "$(command -v nodejs)" ]; then
    # NodeJS is not installed
    printf '[ERROR]: NodeJS is not installed.\n' | tee -a logfile.txt
    # NodeJs installation commands
    bash -c "sudo apt-get update"
    bash -c "sudo apt-get upgrade"
    printf "[Installing NodeJS]\n" | tee -a logfile.txt
    bash -c "sudo apt-get install nodejs"
else
    # Run nodejs version command
    OUTPUT="$(nodejs --version)\n"
    printf "NodeJS: ${OUTPUT}" | tee -a logfile.txt
fi
# Check for precence of aws
if ! [ -x "$(command -v aws)" ]; then
    # aws is not installed
    printf '[ERROR]: aws is not installed.\n' | tee -a logfile.txt
    # AWS installation commands
    bash -c "sudo apt-get update"
    bash -c "sudo apt-get upgrade"
    printf "[Installing AWS]\n" | tee -a logfile.txt
    # Install pip
    bash -c "sudo apt install python-pip"
    bash -c "pip install awscli --upgrade --user"
    home=$(echo ~)
    bash -c "sudo cp $home/.local/bin/aws /usr/local/bin"

else
    # Run aws version command
    OUTPUT="$(aws --version)"
    printf "aws: ${OUTPUT}\n" | tee -a logfile.txt
fi

# Check for precence of terraform
if ! [ -x "$(command -v terraform)" ]; then
    # Terraform is not installed
    printf '[ERROR]: terraform is not installed.\n' | tee -a logfile.txt
    # Terraform installation commands
    bash -c "sudo apt-get update"
    bash -c "sudo apt-get upgrade"
    printf "[Installing Terraform] \n" | tee -a logfile.txt
    bash -c "sudo apt-get install unzip"
    bash -c "wget https://releases.hashicorp.com/terraform/0.11.10/terraform_0.11.10_linux_amd64.zip"
    bash -c "unzip terraform_0.11.10_linux_amd64.zip"
    bash -c "sudo mv terraform /usr/local/bin/"
    run_cmd 'rm terraform_0.11.10_linux_amd64.zip'
else
    # Run nodejs version command
    OUTPUT="$(terraform --version)"
    printf "Terraform: ${OUTPUT}\n" | tee -a logfile.txt
fi

# Check for precence of docker
if ! [ -x "$(command -v docker)" ]; then
    # docker is not installed
    printf '[ERROR]: docker is not installed.\n' | tee -a logfile.txt
    bash -c "sudo apt-get update"
    printf "[Installing Docker]\n" | tee -a logfile.txt
    # Docker installation commands
    bash -c "sudo apt-get install curl"
    bash -c "curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -"
    bash -c "sudo add-apt-repository deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
    bash -c "sudo apt-get update"
    bash -c "apt-cache policy docker-ce"
    bash -c "sudo apt-get install -y docker-ce"
else
    # Run nodejs version command
    OUTPUT="$(docker --version)"
    printf "Docker: ${OUTPUT}\n" | tee -a logfile.txt
fi

# Check for precence of docker-compose
if ! [ -x "$(command -v docker-compose)" ]; then
    # docker is not installed
    printf '[ERROR]: docker-compose is not installed.\n' | tee -a logfile.txt
    printf "[Installing Docker-compose]\n" | tee -a logfile.txt
    # Docker installation commands
    bash -c "sudo curl -L "https://github.com/docker/compose/releases/download/1.23.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose"
    bash -c "sudo chmod +x /usr/local/bin/docker-compose"
else
    # Run nodejs version command
    OUTPUT="$(docker-compose --version)"
    printf "Docker-compose: ${OUTPUT}\n" | tee -a logfile.txt
fi

# Display time of end using the defined date format
printf "Time of end:  $(date "$nice_date_format")\n" | tee -a logfile.txt
