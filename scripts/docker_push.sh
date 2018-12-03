#!/bin/bash

GIT_COMMIT=$1

docker push skulia15/quality-assurance-course:$GIT_COMMIT

# TODO exit on error if any command fails