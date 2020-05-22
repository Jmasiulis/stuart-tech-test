import express from 'express';
import courierRouter from './courier';

const app = express();

app.use("/courier/", courierRouter);

export default app;