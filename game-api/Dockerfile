# Get node for the Docker container.
FROM node:dubnium
# Set the working directory to /code inside the docker container.
WORKDIR /code
# Copy files from the local file system into the container.
# Copy the package.json file so that the dependencies/packages are managed correctly and the container fetches the same packages as the local instance.
#COPY package.json package.json
# Copy the database file to the container.
#COPY database.js database.js
# Copy the app.js file to the container.
#COPY app.js app.js
# Copies all files in the game-api directory except for the ones in the dockerignore file
COPY . .

# Run an installation process in the container to fetch all required dependencies
RUN npm install --production
# Main command, starts upp the app.js file.
CMD node app.js

# Give postgres time to setup before we try to migrate.
CMD sleep 5 && npm run migratedb:pg && node app.js