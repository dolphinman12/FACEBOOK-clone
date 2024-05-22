import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import db from './models/index.js';

import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

db.sequelize.sync().then(() => {
  app.listen(port, () => console.log(`Server running on port ${port}`));
});

