import { Controller, Post, ClassMiddleware } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Beach } from '@src/models/beach';
import { BaseController } from '.';
import { authMiddleware } from '@src/middlewares/auth';

@Controller('beaches')
@ClassMiddleware(authMiddleware)
export class BeachesController extends BaseController {
  @Post('')
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const beach = new Beach({ ...req.body, ...{ user: req.decoded?.id } });

      const result = await beach.save();

      return res.status(201).send(result);
    } catch (err) {
      return this.sendCreateUpdateErrorResponse(res, err);
    }
  }
}
