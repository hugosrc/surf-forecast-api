import { Controller, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { User } from '@src/models/user';
import { BaseController } from '.';
import { AuthService } from '@src/services/auth';

@Controller('users')
export class UsersController extends BaseController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const user = new User(req.body);

      const newUser = await user.save();

      const token = AuthService.gerenateToken(user.toJSON());

      res.status(201).send({
        user: newUser.toJSON(),
        token,
      });
    } catch (err) {
      this.sendCreateUpdateErrorResponse(res, err);
    }
  }

  @Post('authenticate')
  public async authenticate(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return this.sendErrorResponse(res, {
        code: 401,
        message: 'User not found!',
      });
    }

    if (!(await AuthService.comparePasswords(password, user.password))) {
      return this.sendErrorResponse(res, {
        code: 401,
        message: 'Password does not match!',
      });
    }

    const token = AuthService.gerenateToken(user.toJSON());

    return res.status(200).send({
      user: user.toJSON(),
      token,
    });
  }
}
