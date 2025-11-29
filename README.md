# Initial Set Up

- Run `npm install` to install all dependencies 
- Create an `.env` file to set up the environment variables 

## Env variables

- REACT_APP_SUPABASE_URL
- REACT_APP_SUPABASE_ANON_KEY 

## Updating Graphql Schema

Use `npx get-graphql-schema <ENDPOINT_URL> > ./data/schema.graphql -h 'apiKey=<AUTH_TOKEN>'`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

`
