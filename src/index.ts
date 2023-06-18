import express from 'express';
import chatGptRouter from './routes/chatgpt.route';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/chatgpt', chatGptRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
