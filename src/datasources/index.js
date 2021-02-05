import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

// Routes
import RestaurantRoute from './routes/restaurant.route'

//Middlewares

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ limit: '200mb' }));
app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.json());

// API's
app.use('/restaurant', RestaurantRoute);

export default app
