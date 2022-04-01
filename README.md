<img src="https://user-images.githubusercontent.com/68757329/161170975-8decd883-cdea-4209-8947-b84ba28d921a.png" width="127px" height="127px" align="left"/>

# Surf Forecast API

Rest API that provides weather forecast on beaches for surfing.

<p align="center">
  <a href="https://surffore.herokuapp.com"><strong>View Demo »</strong></a>
  <a href="https://surffore.herokuapp.com/docs"><strong>Explore the docs »</strong></a>
  <a href="https://github.com/hugosrc/surf-forecast-api/contribute"><strong>Contribute</strong></a>
</p>

## Table of contents

- [Overview](#overview)
  - [Objective](#objective)
  - [Tecnology](#tecnology)
- [Developing](#developing)
  - [First steps](#first-steps)
  - [Running the server](#running-the-server)
  - [Testing](#testing)
- [Data Flow](#data-flow)
  - [Server](#server)
    - [1. Create Beach](#1-create-beach)
    - [2. Get Beach Forecast](#2-get-beach-forecast)
- [Contact](#contact)

## Overview

Developed based on the [From Zero to Production](https://www.nodejs-typescript-api.com/curso-gratis/) course.

### Objective

This project was created with the objective of developing something using modern concepts and techniques in software development, such as containerization, use of workflows for process automation, documentation using OpenAPI specification, and much more.

### Tecnology

- [NodeJS](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Swagger](https://swagger.io/specification/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/)
- [Github Actions](https://github.com/features/actions)

## Data Flow

For more information, visit the API [documentation](https://surffore.herokuapp.com/docs).

### Server

#### 1. Create Beach

![beach-flow](https://user-images.githubusercontent.com/68757329/161171068-3c8913a2-7597-4e00-a804-eabf59dd377f.png)

**Example**
  
  > `POST /beaches`

  ```json
  {
    "name": "Maresias Beach",
    "position": "S",
    "lat": -23.791711,
    "lng": -45.567022
  }
  ```

  > `201 Created`
  
  ```json
  {
    "name": "Maresias Beach",
    "position": "S",
    "lat": -23.791711,
    "lng": -45.567022,
    "user": "61eee0f84a749ca7b4805388",
    "id": "61eee0fe4a749ca7b4805389"
  }
  ```
  
#### 2. Get Beach Forecast

![forecast-flow](https://user-images.githubusercontent.com/68757329/161170934-67a04944-097c-4735-9fbd-50f36c67d9f0.png)

**Example**
  
  > `GET /forecast`

  > `200 Ok`
  
  ```json
  [
    {
      "time": "2022-02-04T00:00:00+00:00",
      "forecast": [
        {
          "lat": -23.791711,
          "lng": -45.567022,
          "name": "Maresias Beach",
          "position": "S",
          "rating": 2,
          "time": "2022-02-04T00:00:00+00:00",
          "swellDirection": 186.06,
          "swellHeight": 0.61,
          "swellPeriod": 9.05,
          "waveDirection": 182.25,
          "waveHeight": 1.17,
          "windSpeed": 7.12,
          "windDirection": 67.68
        },
        ...
      ]
    },
    ...
  ]
  ```

## Developing

To develop for this project it is recommended that you have [Docker](https://docs.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed.

### First steps

1. **Clone the repository:**
```sh
$ git clone https://github.com/hugosrc/surf-forecast-api
```

2. **Build the base images:**
```sh
$ docker-compose build surfforecast-api
```

### Running the server

1. **Start database**
```sh
$ make start-db
```

2. **Then finally, start the server**
```sh
$ make surfforecast-api
```

### Testing

```sh
# Run all tests 
$ yarn test

# Run all unit tests
$ yarn test:unit

# Run all functional tests
$ yarn test:functional
```

## Contact

[![Linkedin Badge](https://img.shields.io/badge/-Hugo%20Souza-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/hugosrc/)](https://www.linkedin.com/in/hugosrc/) 

[![Gmail Badge](https://img.shields.io/badge/-hugosr.contato@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:hugosr.contato@gmail.com)](mailto:hugosr.contato@gmail.com)
