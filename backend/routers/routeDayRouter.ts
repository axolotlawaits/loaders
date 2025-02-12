import express from 'express'
import { addRouteDay, getRouteDays } from '../controllers/routeDayController'

const router = express.Router()

router.get('/route/:id', getRouteDays)

router.post('/route/:id', addRouteDay )

export default router