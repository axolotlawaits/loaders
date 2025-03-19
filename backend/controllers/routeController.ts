import { prisma } from "../server.js"
import { Request, Response } from "express"
import asyncHandler from 'express-async-handler'

export const addRoute = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  let { name, contractor, rrs, filials } = req.body
  let filialsToObj = filials.map((fil: string) => ({name: fil}))

  const newRoute = await prisma.route.create({
    data: { name, contractor, rrs, filials: { create: filialsToObj }},
    include: {filials: true}
  })

  if (newRoute) {
    filialsToObj = filials.map((fil: string) => ({routeId: newRoute.id, name: fil}))
    await prisma.routeDay.create({
      data: {routeId: newRoute.id, day: new Date(), filials: { create: filialsToObj }}
    })
    res.status(200).json(newRoute)
  } else {
    res.status(400).json({error: 'ошибка создания маршрута'})
  }
})

export const getRoutes = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const routesData = await prisma.route.findMany({include: {filials: {where: {routeDayId: null}, orderBy: {place: 'asc'}}}})

  if (routesData) {
    res.status(200).json(routesData)
  } else {
    res.status(400).json({error: 'не найдено маршрута'})
  }
})

export const updateRoute = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const routeId = req.params.id
  let { name, contractor, rrs, filials } = req.body

  const updatedFilials = await Promise.all(filials.map((filial: any) => {
    return prisma.filial.update({
        where: { id: filial.id },
        data: {
            place: filial.place,
            name: filial.name,
        }})
  }))
  if (updatedFilials) {
    const updatedRoute = await prisma.route.update({
      where: {id: routeId},
      data: { name, contractor, rrs }
    })
  
  
    if (updatedRoute) {
      res.status(200).json(updatedRoute)
    } else {
      res.status(400).json({error: 'не удалось обновить маршрут'})
    }
  }
})

