import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import router from './routes/index.js'
import adminRoutes from './routes/admin.js'
import userRoutes from './routes/user.js'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: true }))
app.use(express.json())
app.use(cors());
app.use(express.static(path.join(__dirname, '/uploads')));

app.use('/', router)
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(error))
