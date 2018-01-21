# Client for Vacation Tracking System

Vacation tracking system helps managing employees vacation requests

## Installation

* Execute ```npm install``` in the root folder
* Possibly you will have to install **serve** manually ```npm install -g serve```

## Prerequisites

* Ensure server part is up and running for the expected address

## Development

### Configuration

Specify ```REACT_APP_SERVER_URL``` property in the config file:

* ```.env.development``` for development
* ```.env.test``` for test
* ```.env.production``` for production

Also you can use .env if some configuration is the same for all environments. If you add ```.local``` to any of your config files it will be ignored for committing

### Start

Execute ```npm start``` (prod) or ```npm run start-dev``` (dev)
