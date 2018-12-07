#!/bin/bash

GIT_COMMIT=$1 
cd game-api || exit 1
docker push username/repo:$GIT_COMMIT || exit 1