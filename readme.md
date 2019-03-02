# GraphQL + Prisma + PostgreSQL + Node.js Boilerplate


## What Is This?
This is a project boilerplate for creating a GraphQL api.

### Features
- A Docker-based Postgres and Prisma setup. No need to install either locally, just run the docker-compose file located in the ```/prisma``` folder.
- Prisma's built-in magic.
- User authentication via JWTs (JSON Web Tokens)

### Requirements
- Docker, installed and running on your system
- Node.js 8.0+
- Yarn/npm
- You could also install Postgres and Prisma globally on your system and not use Docker, but what's the fun in that? :)

## Instructions (Local)
1. Clone this repo into a directory of your choice, and run ```yarn``` (or npm install) to install deps

2. Create a local environment vars file at ```/config/dev.env```, and insert the following line: 
    ```
    PRISMA_ENDPOINT=http://0.0.0.0:4466
    ```
    (Note: this is the IP I use for dev work on my Mac when I'm using Docker, but it is possibly different on your setup. It may be 192.168.1.xx, or localhost, etc.)

3. Enter the ```/prisma``` folder, and run ```docker-compose up -d``` (This creates and runs a detached Docker container composition, running PostgreSQL and Prisma, and pre-configured to communicate with each other.) Now we have Prisma (and PostgreSQL) up, but we still need to deploy it.

2. While still in this directory, run ```prisma deploy -e ../config/dev.env``` This will deploy the service to the local Prisma server you just started above, using the local configuration settings in ```/config/dev.env```

2. Back out into the root directory, and run ```yarn get-schema``` to generate full schema data. (I think this is already included in the repo, but you will need to run this again if you add/remove any resolvers.)

2. Now, run ```yarn dev``` to start your Node.js server, and start developing and/or tinkering - with basic live reloading included via Nodemon.

2. With things running you can now run the 'GraphQL Playground' in a browser, which is a graphical frontend/interface for testing out queries/mutations/subscriptions, as well as viewing the schema/docs. This will be available at your endpoint, which is at ```http://0.0.0.0:8000``` for me. (Again, this endpoint will likely be different for you!)

3. You can shut down the local docker composition (Postgres and Prisma) by running ```docker-compose down``` from the ```/prisma``` directory.
