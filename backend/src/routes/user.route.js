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

export default userRouter;
