[![Test](https://github.com/Nalhin/TrendingNearMe/workflows/Test/badge.svg)](https://github.com/Nalhin/TrendingNearMe/actions)
[![codecov](https://codecov.io/gh/Nalhin/TrendingNearMe/branch/master/graph/badge.svg)](https://codecov.io/gh/Nalhin/TrendingNearMe)

# Trending Near Me

Display Twitter trends based on selected location.

## Table of contents

- [Features](#features)
- [Description](#description)
- [Presentation](#presentation)
- [Technology Stack](#technology-stack)
- [Project Architecture](#project-architecture)
- [Prerequisites](#prerequisites)
- [Env schema](#env-schema)
- [Installation](#installation)
- [Tests](#tests)
- [License](#license)

## Features

* Twitter API integration
* Leaflet map
* Authorization and authentication
* REST API
* Two frontend applications (Angular and React)

## Description

The main objective of this project was to utilize NX as a mono-repository management tool and test 
its capabilities in an environment with multiple TypeScript frameworks. 

#### Backend

REST API developed in NestJS.
It features custom user authorization with the data persistence layer (MongoDB).
The Twitter API is seamlessly encapsulated in its own services rendering the whole application independent of its implementation.
Reactive programming enabled effective and linear data flow management.

#### Frontend

Interactive Leaflet map which displays trends near locations selected by the users.
It also enables them to inspect and visualize their personal search history.

## Presentation

#### API Schema

![Dep graph](screenshots/api-schema.png)

*Swagger API docs*

#### React

<a href="https://www.youtube.com/watch?v=JhKo3N3bbAg">
    <img src="screenshots/frontend-react.gif" alt="Project overview React"/>
</a>


#### Angular

<a href="https://youtu.be/3WkqADixNbs">
    <img src="screenshots/frontend-angular.gif" alt="Project overview Angular"/>
</a>

## Technology stack

#### Frameworks & Libraries

* NestJS
* React
* Angular

#### Summary

The project was developed following modern web development trends and utilizing advanced TypeScript concepts such as:

* Decorators
* Metadata
* Advanced generics
* Functional programming
* Reactive programming
 
## Project Architecture

The project consists of the following applications & libraries.

```
apps
├── backend (and backend-e2e)
├── frontend-react
└── frontend-angular

libs
├── data (interfaces, models and reusable functions)
└── fixtures (test fixtures)
``` 

![Dep graph](screenshots/dep-graph.png)

*Dependency graph*

In order to inspect interactive dependency graph visualization run the following command.

```bash
npm run dep-graph
```

## Env schema

The env file with the following schema must be provided in the root directory before running the application

```bash
DB_PORT= Database port @type: Number @required
DB_NAME= Database name @type: String @required
PORT= Server port @type: Number @optional @default=8000
JWT_SECRET= Jwt secret key @optional @default="jwt"
JWT_EXPIRES_IN="7 days" @optional @default="7 days"
DB_USER= Database user @required
DB_PASSWORD= Database password @required
TWITTER_API_KEY= Twitter API key @required
```

## Prerequisites

Install node package manager npm. You should be able to run the following commands.

```bash
node --version
npm --version
```

Install [docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/).
You should be able to run the following commands.

```bash
docker --version
docker-compose --version
```

## Installation

Run the following commands before proceeding to the section below.

```bash
npm install
docker-compose ./docker/docker-compose.dev.yml up -d
```

#### Backend

```bash
npm run start backend
```

#### Frontend React

Prerequisites: Backend

```bash
npm run start frontend-react
```

Open ```http://localhost:4200/``` in your browser.

#### Frontend Angular

Prerequisites: Backend

```bash
npm run start frontend-angular
```

Open ```http://localhost:4200/``` in your browser.

## Tests

In order to run tests for the selected NX app refer to the commands below. 

#### Backend unit tests

```bash
npm run test backend
```

#### Backend E2E tests

```bash
docker-compose -f ./docker/docker-compose.dev.yml up -d
npm run e2e backend-e2e
```

#### Frontend React unit tests

```bash
npm run test frontend-react
```

#### Frontend Angular unit tests

```bash
npm run test frontend-angular
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
