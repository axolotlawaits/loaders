import { prisma } from "../server.js"
import { Request, Response } from "express"
import asyncHandler from 'express-async-handler'

export const addRoute = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  let { name, rrs, filials } = req.body
  let filialsToObj = filials.map(fil => ({name: fil}))
  const newRoute = await prisma.route.create({
    data: { name, rrs, filials: { create: filialsToObj } }
  })

  if (newRoute) {
    res.status(200).json(newRoute)
  } else {
    res.status(400).json({error: 'ошибка создания маршрута'})
  }
})

export const getRoutes = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const routesData = await prisma.route.findMany({})

  if (routesData) {
    res.status(200).json(routesData)
  } else {
    res.status(400).json({error: 'не найдено маршрута'})
  }
})