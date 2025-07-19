# Beyond OAuth.


### Run with Docker Compose (recommended if you have Docker)

``` docker compose up --build ```





### Environment Configuration Overview
1. A "bootstrap.js" file is loaded automatically on startup to manage environment variables using dotenv.


2. config/{environment}.env is loaded based on process.env.ENVIRONMENT, which is set by the script in package.json (e.g., npm run dev_local sets ENVIRONMENT=dev).

3. config/shared.env holds variables common to all environments.


## Multiple Github apps and a single Google  app

### Why two different applications? Why one for AWS and one for local?
Github Oauth apps. only allow you up to one callback URL. Also I was not able to use An actual Github app to allow more than one callback Urls.
The credentials will be in their own secret environment variable file, along the base server URL, which is NOT a secret But needs to be specific to each server.
### Single Google app.
This single Google app does not allow multiple callback URLs. That is why it will remain in a secret shared .env file.




## API Documentation:

[Documentation](https://www.notion.so/Managing-Oauth-without-third-party-libraries-Github-and-Google-2333826aa7ed80b7a562e495ab6b82c3)