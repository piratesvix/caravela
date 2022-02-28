import cors from 'cors'
import helmet from 'helmet'
import express from 'express'


const app: express.Application = express();

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '300kb' }));
app.use(express.urlencoded({ extended: true }));

export default app;