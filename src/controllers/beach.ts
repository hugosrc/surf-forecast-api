import { Controller, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Beach } from '@src/models/beach';

@Controller('beaches')
export class BeachesController {
  @Post('')
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const beach = new Beach(req.body);

      const result = await beach.save();

      return res.status(201).send(result);
    } catch (err) {
      return res.status(422).send({ error: err.message });
    }
  }
}
