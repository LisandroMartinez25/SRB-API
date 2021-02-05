import express from 'express'
import cors from 'cors'

// Routes
import RestaurantRoute from './routes/restaurant.route'

//Middlewares

const app = express();
app.use(cors());

// API's
app.use('/restaurant', RestaurantRoute);

export default app
