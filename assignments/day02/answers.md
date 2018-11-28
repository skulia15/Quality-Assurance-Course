# Docker Exercise
This assignment was about setting up, getting familiar with and comfortable using Docker. We create a Docker image to run in a container.
The container is a clean and lightweight virtual machine. We do this to eliminate errors that might occur when running in a new environment. By having our program running correctky in a docker container we can almost asssure that the program will run in the targetted environment. We learned how to compose docker containers and work with  multiple containtainers.

## What is Docker?
Docker is an open source tool that makes it easier to create, deploy, and run applications by using containers. Developers can easily package up their application along with all its essential parts. The package can then be set up in a docker container and run inside a kind of virtual Linux environment. Docker uses the same kernel as the computer that it runs in that is why the package can then be pulled and run inside any Linux environment.

## What is the difference between:
* Virtual Machine
* Docker Container
* Docker Image

A Docker image is a set of layers and is used to execute code in a Docker container. It is a completely built application along with dependencies.
A Docker container is an instance of an image. Executable and runnable. Application code is bundled up so that it can run over all linux environments. It does emulate the functionality of a computer.
A Virtual machine is an emulation of a computer system. They provide functionality of a physical computer.

## Web API?
A web api is a programming interface invopacle through http requests. It is a set of subroutine definitions, protocols, and tools for building software and applications. Wep API's allow progreammers to retrieve or manipulate data to achieve desired functionality.

## Postgres?
PostgreSQL is a powerful, open source object-relational and general purpose database management system. It is stable and reliable. It has many advanced features such as User-defined types, Table inheritance, Sophisticated locking mechanism and much more. It allows custom functions useing a variety of programming languages. 

## package.json file dependencies field:
The dependencies field lists all the applications dependencies along with their version number. All you have to do to set up the application on a fresh machine is to run npm install(or Yarn) in the same direcory as the package file to fetch all the required dependencies. It installs the dependencies into the node_modules folder 
## NPM express package:
express.js is a web application framework for node.js. It provides http utility methods and middleware. For example express provides routing, redirection and caching. It organizes your web application into an MVC architecture on the server side.

## NPM pg package:
It is a prostgres client package for node.js hosted on npm. It supports postgres specific SQL extensions.

## What is docker-compose:
Compose is a tool for defining and running multi-container Docker applications. A yaml reference file is used to define the containers to compose together. The environment is defined in a docker file. the services are defined in the docker compose yaml file and the docker-compose up command starts the composition and runs the app.

## Results
We set up docker on our machines and configured it. We learned the terminology of the objects that make up a running docker service. We created a docker file to define our image. We created a web api using node . We built the app and created an image with it and ran the container. We saw that it was working so we shared our image and published it to the docker clound. Then we created a compose file and installed docker-compose. We built and ran the multi container that included the postgres database. We posted items into the web service and saw that the web api was functioning correctly.