import express, { Router } from 'express'
import { getAll } from '../controller/OrderController.js';

const router = Router();

router.get('/all', getAll);

export { router };