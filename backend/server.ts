import express, {Request, Response} from 'express';
import { spawn } from "child_process" 
import cors from "cors"
import { PrismaClient } from "@prisma/client"
import routeDayRouter from './routers/routeDayRouter.js'
import routeRouter from './routers/routeRouter.js'
import filialRouter from './routers/filialRouter.js'
import path from 'path'
import { z } from 'zod'
import { validateData } from './middleware/validation.js';
import pg from 'pg'
import { scheduleRouteDay } from './middleware/routeDayScheduler.js';
import schedule from 'node-schedule'

const app = express()
export const prisma = new PrismaClient()
const { Pool } = pg

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASS,
  host: process.env.HOST,
  port: 5432, 
  database: process.env.DATABASE_1C
})
const __dirname = path.resolve()
  
app.use(cors())
app.use(express.json())
app.use('/load/route', routeRouter)
app.use('/load/routeDay', routeDayRouter)
app.use('/load/filial', filialRouter)
app.use("/load", express.static(__dirname))

// schedule.scheduleJob('0 0 * * *', () => scheduleRouteDay())

const ldapLoginSchema = z.object({
  login: z.string().min(1, 'введите логин'),
  pass: z.string().min(1, 'введите пароль'),
})

app.post('/load/login', validateData(ldapLoginSchema), async (req: Request, res: Response) => {
  const { login, pass } = req.body
  const process = spawn('python', ["./utilities/ldap.py", login, pass])
  process.stdout.on('data', data => { 
    console.log(JSON.parse(data))
    try {
      res.status(200).json(JSON.parse(data))
    } catch {
      res.status(400).json({ldapError: 'проверьте введенные данные'})
    }
  }) 
  
  process.on('close', code => {
    console.log('child process exited with code ', code)
  })
})

app.get('/load/filials', async (req, res) => {
  pool.query(
    `
      SELECT "S_branch".branch
      FROM "S_branch" 
      WHERE city = 'Новосибирск' AND branch_status IN ('Действующий', 'Новый') 
      AND branch_type IN ('Магазин', 'Сервиcный центр', 'Региональный цех ремонта', 'РСЦ')
    `, 
    (err, result) => {
    if (err) {
      console.log(err)
      res.status(400).json({error: 'ошибка запроса'})
    } else {
      res.status(200).json(result.rows.map(value => value.branch))
    }
  })
})

scheduleRouteDay()

app.listen(5001, function() { 
  console.log('server running on port 5001')
}) 