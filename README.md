# Elementree coding challenge - Web - Eric Murano

This application is the frontend component of my submission to the Elementree coding challenge.

## Assumptions about your system

For the purposes of the instructions in this readme, it's assumed that:

1. the system you are running the application on uses NVM to manage different versions of Node, and
2. you are running in some sort of unix like shell like bash or zsh

## Running the application

After checking out the codebase, follow these instructions to run the application.

It's assumed that you are running the backend application, which is available in another GitHub repository. You will need the URL of the backend application to follow these steps.


1. In a terminal, change to the directory that you checked the code out in (the directory this readme file is in) 
2. Create the `.env.local` file and set the URL of the backend in the file.
   ```shell
   echo "REACT_APP_API_BASEURL=http://localhost:3001/" > .env.local
   echo "REACT_APP_MAPBOX_ACCESS_TOKEN=XXXX" >> .env.local
   ```
   Change `http://localhost:3001/` to what ever port you're running the API on.

   Change `XXXX` to what ever your Map API key is.

3. Switch your version of node to the one the project was built on. This will use the `.nvmrc` file to determine which version of node to switch to.
   ```shell
   nvm use
   ```
4. Run the react-scripts run command
   ```shell
   npm start
   ```

## Running the tests

1. Switch your version of node to the one the project was built on. This will use the `.nvmrc` file to determine which version of node to switch to.
   ```shell
   nvm use
   ```
2. Run the react-scripts test command
   ```shell
   npm run test
   ```
3. If you wish to run the tests in watch mode, run the following command:
   ```shell
   npm run test-watch
   ```
