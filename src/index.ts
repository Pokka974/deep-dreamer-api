import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { createStream } from 'rotating-file-stream';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swaggerOptions';

import authRouter from './routes/auth.route';
import chatGptRouter from './routes/chatgpt.route';
import dallERouter from './routes/dallE.router';
import userRouter from './routes/user.route';
import { logInfo } from './services/logger.service';

const app = express();
const port = process.env.PORT ?? 3000;

const accessLogStream = createStream('access.log', {
    size: '10M', // rotate every 10 MegaBytes written
    interval: '1d', // rotate daily
    path: path.join(__dirname, '../logs'),
});

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(
    morgan(
        ':remote-user [:date[web]] -- :method :url :status :response-time ms :user-agent',
        { stream: accessLogStream },
    ),
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/auth', authRouter);
app.use('/chatgpt', chatGptRouter);
app.use('/dalle', dallERouter);
app.use('/users', userRouter);

app.listen(port, () => {
    logInfo(`Server is running on http://localhost:${port}`);
});
