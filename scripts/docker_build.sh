
#!/bin/bash

GIT_COMMIT=$1

cd game-api || exit 1
docker build -t skulipardus/hgop:$GIT_COMMIT . || exit 1
cd ../game-client || exit 1
docker build . -t skulipardus/lucky21-front-end || exit 1