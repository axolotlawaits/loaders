import { prisma } from "../server.js"

export const scheduleRouteDay = async (): Promise<any> => {
  const allRoutes = await prisma.route.findMany({
    select: {id: true, filials: {
      where: {routeDayId: null}, 
      select: {name: true, routeId: true, place: true}
    }}
  })

  if (allRoutes) {
    for (let route of allRoutes) {
      let today = new Date()
      today.setHours(0,0,0,0)
      const exist = await prisma.routeDay.findMany({
        where: {routeId: route.id, day: {gte: today}}
      })
      if (exist.length === 0) {
        await prisma.routeDay.create({
          data: { routeId: route.id, day: new Date, filials: { create: route.filials } }
        })
      }
    }
  }
}


