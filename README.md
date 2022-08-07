# Elementree coding challenge - Eric Murano

This application is the frontend component of my submission to the Elementree coding challenge.

## Assumptions about your system

It's assumed that the system you are running the application on uses NVM to manage different versions of Node.

## Running the application

After checking out the codebase, follow these instructions to run the application.

> :warning: Note: at this time, the backend application has not been written yet.
> You won't need to have a node application running nor do you need to define the `REACT_APP_API_BASEURL`
> environment variable.

It's assumed that you are running the backend application, which is available in another GitHub repository. You will need the URL of the backend application to follow these steps.

The examples assume that you have a terminal open and your current working directory is the base directory of this project, the same directory that this readme file is in.

1. Create the `.env.local` file and set the URL of the backend in the file.
   ```shell
   echo "REACT_APP_API_BASEURL=http://localhost:3000/" > .env.local
   echo "REACT_APP_MAPBOX_ACCESS_TOKEN=XXXX" >> .env.local
   ```
   Change `http://localhost:3000/` to what ever port you're running the API on.

   Change `XXXX` to what ever your Map API key is.

2. Switch your version of node to the one the project was built on. This will use the `.nvmrc` file to determine which version of node to switch to.
   ```shell
   nvm use
   ```
3. Run the react-scripts run command
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
