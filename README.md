eTransafe Rosetta Stone UI
==========================

**A simple React interface for the eTransafe Rosetta Stone**

### REQUIREMENTS

- The eTransafe Rosetta Stone back-end up and running. It is
  available [here](https://github.com/mi-erasmusmc/ets-rosetta-stone)
- [Node.js and NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### HOW TO USE

Install the required packages with `npm install`

Set the url for the eTransafe Rosetta Stone back-end in the .env file

From the project directory, you can run `npm start`
This runs the app in development mode.
Open [http://localhost:4200/rosettastone.kh.svc](http://localhost:4200/rosettastone.kh.svc) to view it in the browser.
The page reloads when you make edits.

`npm run build` builds the app for production to the `build` folder.\
It bundles React in production mode and optimizes the build for the best performance.

### OPTIONS

#### AUTHENTICATION

If you have Keycloack enabled on the back-end you also need to enable it on the front-end in order to pass the tokens
with your requests. In order to do this set KEYCLOAK_ENABLED=true in the .env file and also provide the required
keycloak details.

#### DOCKER

The dockerfile builds the app and exposes it through NGINX you can pass the same values present in the .env file as
environment variables for your container in order to run the same build in different environments.

### CONTRIBUTIONS

This code was copy-pasted together by a back-end developer, contributions are welcome :-)

