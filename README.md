<div align="center">
  <h1 align="center">SurfForecast API</h1>

  <p align="center">
    <img src="https://img.shields.io/github/languages/top/hugosrc/surf-forecast-api?color=%2334ebd5">
    <img src="https://img.shields.io/github/languages/code-size/hugosrc/surf-forecast-api?color=%2334ebd5" />
    <img src="https://img.shields.io/github/license/hugosrc/surf-forecast-api?color=%2334ebd5" />
  </p>

  <p align="center">SurfForecast is an API developed to help surfers, providing information about wave size, wind strength and other information about nearby beaches.</p>

  <p align="center">
    <a href="https://surffore.herokuapp.com"><strong>View Demo »</strong></a>
    <a href="https://surffore.herokuapp.com/docs"><strong>Explore the docs »</strong></a>
    <a href="https://github.com/hugosrc/surf-forecast-api/contribute"><strong>Contribute</strong></a>
  </p>
</div>

## Table of contents

- [Overview](#overview)
  - [Objectives](#objectives)
  - [Built With](#built-with)
- [Data Flow](#data-flow)
  - [Server](#server)
    - [1. Create Beach](#1-create-beach)
    - [2. Get Beach Forecast](#2-get-beach-forecast)
- [Developing](#developing)
  - [First steps](#first-steps)
  - [Running the server](#running-the-server)
- [Contact](#contact)

## Overview

Developed based on the [From Zero to Production](https://www.nodejs-typescript-api.com/curso-gratis/) course.

### Objectives

This project was created with the objective of developing something using modern concepts and techniques in software development, such as containerization, use of workflows for process automation, documentation using OpenAPI specification, and much more.

### Built With

- [NodeJS](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [OpenAPI](https://swagger.io/specification/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/)

## Data Flow

For more information, visit the api [documentation](https://surffore.herokuapp.com/docs).

### Server

#### 1. Create Beach

![beach-flow](https://user-images.githubusercontent.com/68757329/152615873-fbcd0cc6-1042-4d99-abcd-05103d3d8628.png)

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

![forecast-flow](https://user-images.githubusercontent.com/68757329/152615922-feb1bcaf-dc7a-4440-abd4-11009c20a547.png)

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

## Contact

Hugo Souza - hugosr.contato@gmail.com
