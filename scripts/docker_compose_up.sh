#!/bin/bash

export GIT_COMMIT=$1
export API_URL=$2
# API_URL="http//:localhost:3000"
export ENVIRONMENT=$3
docker-compose down
docker-compose up