import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swaggerOptions';

import authRouter from './routes/auth.route';
import chatGptRouter from './routes/chatgpt.route';
import dallERouter from './routes/dallE.router';
import userRouter from './routes/user.route';

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/auth', authRouter);
app.use('/chatgpt', chatGptRouter);
app.use('/dalle', dallERouter);
app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
