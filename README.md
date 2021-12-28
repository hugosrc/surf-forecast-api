<h1 align="center">SurfForecast API</h1>

<p align="center">
  <img src="https://img.shields.io/github/languages/top/hugosrc/surf-forecast-api?color=%2334ebd5">
  <img src="https://img.shields.io/github/languages/code-size/hugosrc/surf-forecast-api?color=%2334ebd5" />
  <img src="https://img.shields.io/github/license/hugosrc/surf-forecast-api?color=%2334ebd5" />
</p>

SurfForecast is an API developed to support surfers, providing information about weather forecast, wave size, wind strength and many other important information for the practice of the sport. Developed based on [Waldemar Neto](https://www.nodejs-typescript-api.com/curso-gratis/)'s course.

# Table of contents

* [Overview](#overview)
  * [Objectives](#objectives)
  * [Tecnologies](#tecnologies)
* [Features](#features)
  * [User Authentication](#user-authentication)
  * [Create Beaches](#create-beaches)
  * [Weather Forecasts](#weather-forecasts)
* [Author](#author)

# Overview

## Objectives

This project was created with the objective of developing something useful that would help solve someone's problem, another objective was to create something that I could develop using concepts and techniques learned in theory, such as the concept of TDD (Test-Driven-Design), containerization of web applications, use of workflows for process automation, in this case a CI/CD pipeline, documentation using OpenAPI, among other concepts.

## Tecnologies

- [NodeJS](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [OpenAPI](https://swagger.io/specification/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/)
- [Github Actions](https://docs.github.com/en/actions/quickstart)

# Features

## User Authentication

The API authentication process is based on JWT tokens, when registering with their name, email and password information, the user receives a token which will be used in the authentication process of several application routes.

## Create Beaches

The user authenticated with his token can create the location of the beaches, which will later be informed about the weather forecast in the exact location, for this all he needs is a name, position, latitude and longitude of the beach.

## Weather Forecasts

The main feature of the API is the weather forecast of the beaches created by the user, which returns an array containing the beach information at an exact moment, for example:

```json
{
  "time": "2021-10-09T00:00:00+00:00",
  "forecast": [
    {
      "lat": -23.791711,
      "lng": -45.567022,
      "name": "Maresias beach",
      "position": "S",
      "rating": 3,
      "time": "2021-10-09T00:00:00+00:00",
      "swellDirection": 174.94,
      "swellHeight": 1.77,
      "swellPeriod": 10.91,
      "waveDirection": 179.12,
      "waveHeight": 1.92,
      "windSpeed": 9.42,
      "windDirection": 97.47
    }
  ]
}
```

# Author

Created by Hugo Souza (hugosr.contato@gmail.com), Contact 👋!
