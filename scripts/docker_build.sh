
#!/bin/bash

GIT_COMMIT=$1

cd game-api || exit 1
docker build -t skulipardus/hgop-api:$GIT_COMMIT . || exit 1
cd ../game-client || exit 1
docker build . -t skulipardus/hgop-lucky21-front-end:$GIT_COMMIT || exit 1
