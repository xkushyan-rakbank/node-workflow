This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

### .env

For local development environment use .env.local

Copy `.env` file and paste your values

```bash
cp .env .env.local
```

### Google ReCaptcha setup

See  [how its work's](https://developers.google.com/recaptcha/intro)

ReCaptcha V2 "I am not a robot" [documentation](https://developers.google.com/recaptcha/docs/display)

1. Create a google account
2. [Sign up for an API key pair for your site](http://www.google.com/recaptcha/admin)
3. Add new ReCaptcha recourse: set `label`, select `type` reCaptcha V2 "I am not a robot", and add `domains`
4. Add `REACT_APP_RECAPTCHA_NOT_ROBOT_PUBLIC_KEY` variable to `.env.local` (`.env.production`, `.env.test`...) 
file and paste generated `site key` 
5. Another `secret key` need keep for [Server Side Validation](https://developers.google.com/recaptcha/docs/verify)
6. For build/start application you can [set environment variable](https://create-react-app.dev/docs/adding-custom-environment-variables#adding-temporary-environment-variables-in-your-shell) `REACT_APP_RECAPTCHA_NOT_ROBOT_PUBLIC_KEY` in your Shell before run
 process, then this variables will be ignored in .env files

### Deployment of the webapply server :

once the Build id completed and azure pipeline will uploaded the build artifact to jfrog

Jenkins jobs ( http://10.15.25.115:8000/jenkins/view/Customer_Onboarding/job/webapply%20Deployment_Dev/ ) 

will downlaod the Build artifact and copy the content in /var/www/webapply path on the resepective servers

where Nginx is installed and web static pages are servered.

### Nginx installation steps 

1. rpm -ivh <.rpm file> 
2. create a dir called 'www' under /var
3. change the permission of the www dir to 777
    chmod 777 /var/www
4. update the configuration file ( /etc/nginx/conf.d/default.conf) with the below changes 
----------------------------------------------
specifc the port in which nginx wants to execute
location /quickapply {
    alias /var/www/webappply;
    try_files $uri $uri/ /index.html?/$request_uri;
}
----------------------------------------------

Testing