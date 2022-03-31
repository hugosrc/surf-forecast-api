import {
  Controller,
  ClassMiddleware,
  Post,
  Put,
  Delete,
} from '@overnightjs/core';
import { Request, Response } from 'express';
import { Beach } from '@src/models/beach';
import { BaseController } from '.';
import { authMiddleware } from '@src/middlewares/auth';

@Controller('beaches')
@ClassMiddleware(authMiddleware)
export class BeachesController extends BaseController {
  @Post('')
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, lat, lng, position } = req.body;

    try {
      const beach = await Beach.create({
        name,
        lat,
        lng,
        position,
        user: req.decoded.id,
      });

      return res.status(201).json(beach);
    } catch (err) {
      return this.sendCreateUpdateErrorResponse(res, err);
    }
  }

  @Put(':id')
  public async update(req: Request, res: Response): Promise<Response> {
    const { name, lat, lng, position } = req.body;
    const beachId = req.params.id;
    const usedId = req.decoded.id;

    const beach = await Beach.findById(beachId);
    if (!beach) {
      return this.sendErrorResponse(res, {
        code: 404,
        message: 'Beach not found',
      });
    }

    if (beach.user != usedId) {
      return this.sendErrorResponse(res, {
        code: 403,
        message: 'Forbidden',
      });
    }

    try {
      await beach.updateOne({
        name,
        lat,
        lng,
        position,
        user: usedId,
      });

      return res.status(200).json({
        id: beachId,
        name,
        lat,
        lng,
        position,
        user: usedId,
      });
    } catch (err) {
      return this.sendCreateUpdateErrorResponse(res, err);
    }
  }

  @Delete(':id')
  public async delete(req: Request, res: Response): Promise<Response> {
    const beachId = req.params.id;
    const usedId = req.decoded.id;

    const beach = await Beach.findById(beachId);
    if (!beach) {
      return this.sendErrorResponse(res, {
        code: 404,
        message: 'Beach not found',
      });
    }

    if (beach.user != usedId) {
      return this.sendErrorResponse(res, {
        code: 403,
        message: 'Forbidden',
      });
    }

    await beach.deleteOne();

    return res.status(204).send();
  }
}
