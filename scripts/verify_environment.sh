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
    . /etc/os-release
    OS=$NAME
    VER=$VERSION_ID
# # else get it from lsb_release if able to type it out
elif type lsb_release >/dev/null 2>&1; then
    # linuxbase.org
    OS=$(lsb_release -si)
    VER=$(lsb_release -sr)
# else get the variables from the lsb_release file
elif [ -f /etc/lsb-release ]; then
    # For some versions of Debian/Ubuntu without lsb_release command
    . /etc/lsb-release
    OS=$DISTRIB_ID
    VER=$DISTRIB_RELEASE
else
    # Fall back to uname, e.g. "Linux <version>", also works for BSD, etc.
    OS=$(uname -s)
    VER=$(uname -r)
fi

# var="$(printf "FORMAT" var1)"
# Environment verification
printf "Checking if you have installed the necessary tools!\n\n" | tee -a logfile.txt
# Check if operating system is ubuntu or OsX Darwin
if [ $OS == "Ubuntu" ] || [$OS = "Darwin    " ]; then
    printf "$OS $VER fits the requirements\n" | tee -a logfile.txt
else 
    printf "You do not have the required OS. Ubuntu or OsX are supported\n\n" | tee -a logfile.txt
fi
if ! [ -x "$(command -v git)" ]; then
    # Git is not installd
    printf 'Error: git is not installed.' | tee -a logfile.txt
else 
    # Run git version command
    OUTPUT="$(git --version)"
    printf "Git: ${OUTPUT}\n" | tee -a logfile.txt
fi

if ! [ -x "$(command -v npm)" ]; then
    # Npm is not installed 
    printf 'Error: Npm is not installed.' | tee -a logfile.txt
else
    # Run npm version command
    OUTPUT="$(npm --version)"
    printf "Npm: ${OUTPUT}\n" | tee -a logfile.txt
fi

if ! [ -x "$(command -v nodejs)" ]; then
    # NodeJS is not installed
    printf 'Error: NodeJS is not installed.' | tee -a logfile.txt
else
    # Run nodejs version command
    OUTPUT="$(nodejs --version)"
    printf "NodeJS: ${OUTPUT}\n\n" | tee -a logfile.txt
fi

# Display time of end using the defined date format
printf "Time of end:  $(date "$nice_date_format")\n" | tee -a logfile.txt
