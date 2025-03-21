import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { API } from "../constants"
import './assets/styles/Route.css'
import Day from "./Day"
import { DayType } from "./Day"

function RouteComponent() {
  const routeParams = useParams()
  const [days, setDays] = useState<DayType[]>([])

  useEffect(() => {
    const getDays = async () => {
      const response = await fetch(`${API}/routeDay/route/${routeParams.id}`)
      const days = await response.json()
      if (response.ok) {
        setDays(days)
      }
    }
    getDays()
  }, [routeParams.id])

  return (
    <div id="route-wrapper">
      <div id="route-days-wrapper">
        {days.length > 0 && days.map(day => {
          return (
            <Day key={day.id} day={day}></Day>
          )
        })}
      </div>
    </div>
  )
}

export default RouteComponent