import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import mainRouterUser from './app/user/routes-user.js';
import mainRouterTask from './app/task/routes-tasks.js';

dotenv.config();
const PORT  = process.env.PORT || 5000;
const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}))

app.use(express.json());

app.get('/', (req, res ) => {
  res.send('API is Running')
})

app.use('/users', mainRouterUser);
app.use('/tasks', mainRouterTask)

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});
