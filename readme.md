# Advanced GraphQL CRUD Demo - with Prisma and Postgres

While this might seem more complex initially, you'll soon notice that this setup is actually MUCH easier to work with than the 'basic' demo. Prisma handles a lot of the heavy lifting and redundant coding, and lets us actually focus on building stuff. It's *super* powerful!!

## What Is This?

This is a more advanced version of a blog CRUD app using GraphQL. (Take a look at the basic version [here](https://github.com/stoutlabs/stoutlabs-graphql-demo), if you haven't seen it first.) This version is a GraphQL API running via a combo of Prisma, Node.js, and a Postgres database. Prisma basically acts as a feature-packed GraphQL server and functions as the "bridge" between Node.js and Postgres. This way we can do user authorization, handle persistent storage, and much more... 

### Features
- A Docker-based Postgres and Prisma setup. No need to install either locally, just run the docker-compose file located in the ```/prisma``` folder.
- Fully refactored queries, mutations, and subscriptions that make use of Prisma's built-in magic.
- User authentication via JWTs (JSON Web Tokens)
- Sorting and Pagination for users, posts, and comments

### Requirements
- Docker, installed and running on your system
- Node.js 8.0+
- Yarn/npm
- You could also install Postgres and Prisma globally on your system and not use Docker, but what's the fun in that? :)

## Instructions (Local)
1. Clone this repo into a directory of your choice, and run ```yarn``` to install deps

2. Create a local environment vars file at ```/config/dev.env```, and insert the following line: 
    ```
    PRISMA_ENDPOINT=http://0.0.0.0:4466
    ```
    (Note: this is the IP I use for dev work on my Mac when I'm using Docker, but it is possibly different on your setup. It may be 192.168.1.xx, or localhost, etc.)

3. Enter the ```/prisma``` folder, and run ```docker-compose up -d``` (This creates and runs a detached Docker container composition, running PostgreSQL and Prisma, and pre-configured to communicate with each other.) Now we have Prisma (and PostgreSQL) up, but we still need to deploy it.

2. While still in this directory, run ```prisma deploy -e ../config/dev.env``` This will deploy the service to the local Prisma server you just started above, using the local configuration settings in ```/config/dev.env```

2. Back out into the root directory, and run ```yarn get-schema``` to generate full schema data. (This is already included in the repo, but you will need to run this again if you add/remove any resolvers.)

2. Now, run ```yarn dev``` to start your Node.js server, and start developing and/or tinkering - with basic live reloading included via Nodemon.

2. With things running you can now run the 'GraphQL Playground' in a browser, which is a graphical frontend/interface for testing out queries/mutations/subscriptions, as well as viewing the schema/docs. This will be available at your endpoint, which is at ```http://0.0.0.0:8000``` for me. (Again, this endpoint will likely be different for you!)

3. You can shut down the local docker composition (Postgres and Prisma) by running ```docker-compose down``` from the ```/prisma``` directory.

## Instructions (Production via Prisma Cloud & Heroku)

1. Create accounts at both Heroku and Prisma Cloud, if you have never done that yet. If you're new to Heroku, also install the heroku cli globally by running ```npm i -g heroku```.

2. At Prisma Cloud, set yourself up a new Prisma *Server* (not Service). It's pretty self explanatory, and you can use free tiers for everything since we're just learning/tinkering. (You could probably even use free tier stuff for low cpu/low traffic production apps.) When asked, connect to your Heroku account, and be sure to choose PostgreSQL as your db. (Currently the only option, as of my writing this.) This process will automatically set everything up for you on Heroku from PrismaCloud!

3. Note: At this point, you could now login to Heroku and get the configuration details for this new setup/cluster. This is handy for many things, e.g. if you wanted to view your Postgres db with a GUI like pgAdmin.

2. Possibly missing step here?

2. Back in your local terminal, run ```heroku create``` to initialize your project. (You may need to login first, via ```heroku login```).

3. Add your production Prisma endpoint (not the client) via an environment variable on whatever service you're using... with Heroku, we can easily do it via command line with: ```heroku config:set PRISMA_ENDPOINT=https://yourserver.name.at.herokuapp.com/your-app-name/prod``` (Note, you can view all your set env vars by running ```heroku config```)

4. To deploy the production Prisma service, switch into the ```/prisma``` directory and run ```prisma deploy -e ./config/prod.env```

4. Finally, run ```git push heroku master``` to push to your Heroku cluster and deploy! (The remote repos were created and connected when you ran the 'heroku create' command, btw.)


#### Notes:

* I used Jest v23.5.0 for testing, due to use of Babel v6 deps in this project. I could have used Jest v24.x, but would need to reconfigure a few deps as well as my Babel config. I will probably do this in a separate branch at another date... :)
