import { prisma } from "../server.js"
import { Request, Response } from "express"
import asyncHandler from 'express-async-handler'

export const addFilialData = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  let filialId = req.params.id
  let { loaders, feedback } = req.body

  const newRoute = await prisma.filial.update({
    where: { id: filialId },
    data: {
      feedback,
      loaders: {
        create: {
          data: loaders
        }
      }
    }
  })

  if (newRoute) {
    res.status(200).json(newRoute)
  } else {
    res.status(400).json({error: 'ошибка создания маршрута'})
  }
})