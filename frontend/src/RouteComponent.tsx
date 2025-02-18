import { Button, Stack, Table } from "@mantine/core"
import { DateInput } from '@mantine/dates'
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { API } from "../constants"
import './assets/styles/Route.css'
import Day from "./Day"

function RouteComponent() {
  const routeParams = useParams()
  const [day, setDay] = useState<Date | null>(null)
  const [days, setDays] = useState([])

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

  const createDay = async () => {
    const response = await fetch(`${API}/routeDay/route/${routeParams.id}`, {
      method: 'POST',
      body: JSON.stringify({day}),
      headers: { 'Content-type': 'application/json' }
    })
    const data = await response.json()
    if (response.ok) {
      setDay(data)
    }
  }

  return (
    <div id="route-wrapper">
      <Stack gap='md'>
        <DateInput
          value={day}
          onChange={setDay}
          placeholder="Date input"
          popoverProps={{ zIndex: 10000 }}
        />
        <Button onClick={createDay}>создать</Button>
      </Stack>
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