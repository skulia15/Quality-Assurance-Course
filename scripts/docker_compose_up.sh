#!/bin/bash

export GIT_COMMIT=$1
# LALALALA_API_LALALAL_URL="http//:localhost:3000"
# export ENVIRONMENT=$3
docker-compose down
docker-compose up