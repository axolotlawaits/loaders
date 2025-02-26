import express from 'express'
import { addRoute, getRoutes } from '../controllers/routeController.js'


const router = express.Router()

router.get('/', getRoutes)

router.post('/', addRoute)

export default router