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

* [Overview](#overview)
  * [Objectives](#objectives)
  * [Built With](#built-with)
* [Developing](#developing)
  * [First steps](#first-steps)
  * [Running the server](#running-the-server)
* [Contact](#contact)

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
