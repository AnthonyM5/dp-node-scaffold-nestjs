# Digital Products NestJS Scaffold

## Description

A scaffolded application to ease creating NodeJS backends. Built on top of the [Nest](https://github.com/nestjs/nest) TypeScript framework.

## TL;DR

You need:

1. [NodeJS](https://nodejs.org/) >= v16.17.0 < v17 (and `npm` >= v8.15.0 < v9)
1. [Nest CLI](https://docs.nestjs.com/cli/overview) v9.x.x (`npm install -g @nestjs/cli`)
1. [Docker Desktop App](https://www.docker.com/)

Run the app:

1. Run `npm run local:services:start` (_This might take a while the first time you run_)
1. Run `npm ci`
1. Start the server with `npm run start:dev`\*

   \*For the list of the required env variables, please refer to [Environment Variables](#environment-variables) below

1. The API is listening on `http://localhost:3000/api/v1`

## Not TL;DR

## Table of Contents

- [Digital Products NestJS Scaffold](#digital-products-nestjs-scaffold)
  - [Description](#description)
  - [TL;DR](#tldr)
  - [Not TL;DR](#not-tldr)
  - [Table of Contents](#table-of-contents)
  - [Setup](#setup)
    - [Prerequisites](#prerequisites)
    - [Prod and Dev](#prod-and-dev)
    - [Environment variables](#environment-variables)
      - [Available environment variables](#available-environment-variables)
  - [Running the app](#running-the-app)
    - [Starting/Stopping MongoDB](#startingstopping-mongodb)
    - [Start the app](#start-the-app)
  - [Debugging](#debugging)
  - [Running Unit Tests](#running-unit-tests)
  - [Linting](#linting)
  - [API Documentation](#api-documentation)
  - [Developer Notes](#developer-notes)
    - [API Versioning](#api-versioning)
  - [VSCode Hints](#vscode-hints)
    - [Docker](#docker)
    - [ESLint for VSCode](#eslint-for-vscode)

<a name="setup"></a>

## Setup

<a name="prerequisites"></a>

### Prerequisites

- `git` is required. It can be downloaded and installed from [here](https://git-scm.com/downloads).

- NodeJS is required (**>=v16.17.0** < **v17**). It can be downloaded and installed from [here](https://nodejs.org/).

- `npm` is required (**>=v8.15.0** < **v9**). It is bundled with NodeJS installer (link above).

- NestJS CLI is required (**v9.x.x**). It can be downloaded and installed by running `npm install -g @nestjs/cli`.
  Note: The `-g` flag will install it globally and requires admin (`sudo`) rights for the current user.

- Docker Desktop App. It can be downloaded and installed from [here](https://www.docker.com/).

<a name="prod-and-dev"></a>

### Prod and Dev

- if you are using Ubuntu or RedHat, you need to install the `build-essential`s
- clone the application (you need `git` installed to do it)
- install all dependencies, including the development ones, by running `npm ci` from the project's root folder

<a name="environment-variables"></a>

### Environment variables

The _primary_ (and _highly recommended_) way to set env variables is through the `.env` file:

- Create an `.env` file at the root level of the project and populate it with all the env vars you need. You can see a list of all the env vars currently used by the application below or in the `.env.example` file located at the root level of the project. An `.env` file should look like this:

```dosini
# .env
PORT=8000
SECRET=mysupersecret
```

#### Available environment variables

**For up-to-date list, please see `.env.example`**

    | Env Variable          | Type                | Description                                                                                                          | Default       |
    | --------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------- |
    | `PORT`                | `integer`           | the port the node server will be listening on                                                                        | `3000`        |
    | `NODE_ENV`            | `string`            | the server environment                                                                                               | `development` |
    | `SESSION_SECRET`      | `string`            | the secret to encode/decode the generated token                                                                      | `undefined`    |
    | `MAX_REQUESTS`        | `integer`           | how many requests are allowed per window from a single IP address before it is blocked                               | `300`         |
    | `RATE_WINDOW_SECONDS` | `integer`           | how many minutes should the requests window be                                                                       | `30`          |
    | `TRUST_PROXY`         | `"true"` (`string`) | set to `true` if the server will be running behind a load balancer or reverse proxy (important for the rate limiter) | `false`       |
    | `ALLOW_CORS`          | `"true"` (`string`) | set to `true` if you want to allow `Cross Origin` requests to the server                                             | `false`       |
    | `DB_URL`              | `string`            | the database url/host                                                                                                | `localhost`   |
    | `DB_PORT`             | `integer`           | the database port                                                                                                    | `27017 `      |
    | `DB_NAME`             | `string`            | the database name that contains the collections that will be queried                                                 | `undefined`    |

<a name="start-local-env"></a>

## Running the app

The application is wired with MongoDB. We use Docker to spin up an instance of MongoDB. We recommend to first start your MongoDB container and then start your application. However, this is
not required because the app automatically retries to connect to the database. Also, please note that the first time you spin up your MongoDB container, it may take a while to start, because
Docker needs to download the MongoDB image.

### Starting/Stopping MongoDB

Run the following command to start your local MongoDB server:

```bash
$ npm run local:services:start
```

Run the following to verify the services are all running:

```bash
$ npm run local:services:ps
```

Run the following to stop the local servers:

```bash
$ npm run local:services:stop
```

### Start the app

```bash
# development (need to manually rebuild and restart on changes)
$ npm start

# development watch mode (auto rebuilds and restarts on changes)
$ npm run start:dev
```

<a name="debugging"></a>

## Debugging

To debug the application, please run

```bash
$ npm run start:debug
```

<a name="running-unit-tests"></a>

## Running Unit Tests

```bash
# unit tests
$ npm test

# test coverage
$ npm run test:cov
```

<a name="linting"></a>

## Linting

```bash
# lint all ts files including the spec ones
$ npm run lint
```

<a name="documentation"></a>

## API Documentation

The app exposes Swagger UI route to explore the API documentation. To access it, please navigate to `http://localhost:3000/docs/api`.
If you would like to access the generated `swagger.json` file, please navigate to `http://localhost:3000/docs/api-json`.
**Please note that the mock endpoints are exposed through the docs, as well with their version number (`v0`). You can select it from the `Servers` dropdown.**

<a name="dev-notes"></a>

## Developer Notes

<a name="api-versioning"></a>

### API Versioning

The API uses `URI` versioning, which means the endpoint version is added to the URI (e.g., `/api/v3/some-endpoint`). Please note that `v0` is used
for any mocked responses and **nothing else**! If you need to create an endpoint that will return a mocked/hardcoded response, please version that endpoint
with `v0`:

```typescript
import { Get, Version } from '@nestjs/common';

// ...

// somewhere inside the `@Controller`
@Version('0')
@Get()
public getMockData() {
  return { mock: 'data' };
}

// ...
```

<a name="vscode-hints"></a>

## VSCode Hints

### Docker

To install the Docker extension for Visual Studio Code: In the editor, open the Extensions view (⇧⌘X), then search for `docker` to filter results and select the Docker extension authored by Microsoft.

### ESLint for VSCode

https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

After installing the above extension, make sure eslint is installed either locally (by running `npm install` in the project folder), or globally via `npm install -g eslint`.

In VSCode, add the following lines to your workspace's `settings.json` to enable auto-formatting on save.

```
"eslint.format.enable": true,
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
}
```
# dp-node-scaffold-nestjs
