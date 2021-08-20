import 'dotenv/config';
import './utils/ts-module-alias';

import { Server } from '@overnightjs/core';
import expressPino from 'express-pino-logger';
import express, { Application } from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import * as OpenAPIValidator from 'express-openapi-validator';
import * as database from '@src/database';
import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
import { ForecastController } from './controllers/forecast';
import { BeachesController } from './controllers/beach';
import { UsersController } from './controllers/users';
import logger from './logger';
import { apiErrorValidator } from './middlewares/api-error-validator';
import apiSchema from '../docs/api.schema.json';

export class SetupServer extends Server {
  constructor(private port = 3000) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpress();
    this.setupDocs();
    this.setupControllers();
    await this.databaseSetup();
    this.setupErrorHandlers();
  }

  private setupExpress(): void {
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: '*',
      })
    );
    this.app.use(
      expressPino({
        logger,
      })
    );
  }

  private setupErrorHandlers(): void {
    this.app.use(apiErrorValidator);
  }

  private setupControllers(): void {
    const forecastController = new ForecastController();
    const beachesController = new BeachesController();
    const usersController = new UsersController();
    this.addControllers([
      forecastController,
      beachesController,
      usersController,
    ]);
  }

  private async databaseSetup(): Promise<void> {
    await database.connect();
  }

  public start(): void {
    this.app.listen(this.port, () => {
      logger.info(`Server listening on port: ${this.port}`);
    });
  }

  public async close(): Promise<void> {
    await database.close();
  }

  private setupDocs(): void {
    this.app.use('/docs', swaggerUI.serve, swaggerUI.setup(apiSchema));
    this.app.use(
      OpenAPIValidator.middleware({
        apiSpec: apiSchema as OpenAPIV3.Document,
        validateRequests: true,
        validateResponses: true,
      })
    );
  }

  public getApp(): Application {
    return this.app;
  }
}
