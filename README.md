# Test for Mango: Range React component
## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Mock URL "mockable.io"

https://www.mockable.io/a/#/space/demo8192803/rest


## NPM registry

- Added .npmrc config because if not the yarn.lock or de package-lock.json will have values of other registry (Indeed.com my current work) and I couldn't deploy in other tools online like Vercel or Netlify
- Use yarn because it performs better than npm

## Next steps

- Storybook
- e2e tests
- i18n plugin
- Github pages always shows 404. Fix it. http://slemankassis.github.io/test-for-mango https://medium.com/swlh/using-react-router-on-github-pages-2702afdd5d0c
- Improve react-app-rewired configs. https://marmelab.com/blog/2021/07/22/cra-webpack-no-eject.html https://github.com/timarney/react-app-rewired
- Fix deploy https://test-for-mang.vercel.app/