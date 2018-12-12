#!/bin/bash

GIT_COMMIT=$1

docker push skulipardus/hgop-api:$GIT_COMMIT || exit 1
docker push skulipardus/hgop-lucky21-front-end:$GIT_COMMIT || exit 1