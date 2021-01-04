import express from 'express';
import { ValidationError } from 'sequelize';
import User from './user.model';
import bcryptUtil from '../bcrypt/bcrypt.util';

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
  try {
    const users = await User.findAll();

    return res.json(users.map((user) => { return user.toResponse(); }));
  } catch (err) {
    return res.sendStatus(500);
  }
});

userRouter.post('/', async (req, res) => {
  try {
    await User.create({
      ...req.body,
      password: bcryptUtil.encode(req.body.password),
    });

    return res.sendStatus(201);
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(400).json(err.errors);
    }
    return res.sendStatus(500);
  }
});

userRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await User.update({
      ...req.body,
      password: bcryptUtil.encode(req.body.password),
    }, { where: { id } });

    return res.sendStatus(204);
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(400).json(err.errors);
    }
    return res.sendStatus(500);
  }
});

userRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await User.destroy({ where: { id } });

    return res.sendStatus(204);
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(400).json(err.errors);
    }
    return res.sendStatus(500);
  }
});

export default userRouter;
