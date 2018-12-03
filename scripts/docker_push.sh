#!/bin/bash

GIT_COMMIT=$1

docker push skulia15/Quality-Assurance-Course:$GIT_COMMIT

# TODO exit on error if any command fails