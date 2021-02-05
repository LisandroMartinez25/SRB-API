import express from 'express'

import RestaurantAPI from '../apis/RestaurantAPI'

const router = express.Router()
const restaurantAPI = new RestaurantAPI()

router.get('/getAvailableRestaurant',  restaurantAPI.getAvailableRestaurants)

export default router