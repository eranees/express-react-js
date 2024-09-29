import express from 'express';
import UserController from '../controllers/user.controller.js';

const userRouter = express.Router();

const userController = new UserController();

userRouter.post('/', async (req, res, next) => {
  await userController.create(req, res, next);
});

userRouter.get('/:id', async (req, res, next) => {
  await userController.findOne(req, res, next);
});

userRouter.get('/', async (req, res, next) => {
  await userController.findAll(req, res, next);
});

userRouter.delete('/:id', async (req, res, next) => {
  await userController.delete(req, res, next);
});

userRouter.put('/:id', async (req, res, next) => {
  await userController.update(req, res, next);
});

export default userRouter;
