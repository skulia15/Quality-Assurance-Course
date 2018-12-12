#!/bin/bash

GIT_COMMIT=$1

docker push skulipardus/hgop:$GIT_COMMIT || exit 1
docker push skulipardus/lucky21-front-end:$GIT_COMMIT || exit 1