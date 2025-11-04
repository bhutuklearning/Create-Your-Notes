import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());


// Routes


app.get('/', (req, res) => {
    res.send('Hello, World from the backend of Create Your notes App!');
});

// Error Handling Middleware


export default app;