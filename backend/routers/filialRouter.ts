import express from 'express'
import { addFilialData } from '../controllers/filialController.js'

const router = express.Router()

router.get('/', )

router.post('/:id', addFilialData)

export default router