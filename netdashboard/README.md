# netDashboard 

netDeshboard is a web application that converts logged hours into stocks in startups.

## Project structure 

```js
netDashboard/           // netDashboard is the root folder
├─ public/              // public holds all assets
├─ src/                 // src includes all the code
│  ├─ components/       // components holds all the view components
│  ├─ config/           // config holds the firebase config
│  ├─ context/          // context holds the AuthContext which sends the user state to all components
```

## Future implementations 

- Reset password.
- Check if an users email is valid.
- Upload a profile picture.
- Add zooming to graphs.
- Convert hours to stock.
- Sending email/notify to remind users that they can log hours.
- Hinder users from logging multiple times during the weekend.
- General UI/UX improvements.
- Improve logic and math behind graphs.

## Available Scripts 

In the project root directory, you can run:

Remember to run 
``` 
npm install 
``` 
Before you start, to install all dependencies.

```
npm start
``` 

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

```
npm test
```

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

```
npm run build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

```
npm run eject
```

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.