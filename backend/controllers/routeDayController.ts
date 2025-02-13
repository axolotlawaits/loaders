import { prisma } from "../server.js"
import { Request, Response } from "express"
import asyncHandler from 'express-async-handler'

export const addRouteDay = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  let routeId = req.params.id
  let { day } = req.body

  const newRoute = await prisma.routeDay.create({
    data: { routeId, day }
  })

  if (newRoute) {
    res.status(200).json(newRoute)
  } else {
    res.status(400).json({error: 'ошибка создания маршрута'})
  }
})

export const getRouteDays = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  let routeId = req.params.id

  const routeData = await prisma.routeDay.findMany({ 
    where: { routeId },
    include: { route: { include: { filials: { include: { loaders: { include: { filial: true}}}}}}}
  })

  if (routeData) {
    res.status(200).json(routeData)
  } else {
    res.status(400).json({error: 'не найдено маршрута'})
  }
})