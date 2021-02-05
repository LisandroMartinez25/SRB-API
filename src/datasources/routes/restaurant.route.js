import express from 'express'
import store from '../../db/models'

import RestaurantAPI from '../apis/RestaurantAPI'

const router = express.Router()
const restaurantAPI = new RestaurantAPI({ store })

router.get('/',  restaurantAPI.getRestaurants)

export default router