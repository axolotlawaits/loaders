import { Button, Stack, Table } from "@mantine/core"
import { DateInput } from '@mantine/dates'
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { API } from "../constants"
import './assets/styles/Route.css'
import moment from 'moment'
import 'moment/dist/locale/ru'
import DayRouteRow from "./DayRouteRow"

function TruckRoute() {
  const routeParams = useParams()
  const [day, setDay] = useState<Date | null>(null)
  const [days, setDays] = useState([])
  
  let rows = []

  for (let day of days) {
    let filials = day.route.filials

    rows = Object.keys(filials).map(filial => (
      <DayRouteRow filials={filials} filial={filial}></DayRouteRow>
    ))
  }

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
  console.log(days[0]?.route.filials[1].loaders[0].startTime)
  return (
    <div id="route-wrapper">
      <Button variant="default" onClick={open}>создать маршрут</Button>
      <Stack gap='md'>
        <DateInput
          value={day}
          onChange={setDay}
          placeholder="Date input"
          popoverProps={{ zIndex: 10000 }}
        />
        <Button onClick={createDay}>создать</Button>
      </Stack>
      {days.length > 0 && days.map(day => {
        return (
          <div key={day.id} className="day-table">
            <caption>{moment(day.day).format('L')}</caption>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Филиал</Table.Th>
                  <Table.Th>Кол-во грузчиков</Table.Th>
                  <Table.Th>Время работы</Table.Th>
                  <Table.Th>Обратная связь</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </div>
        )
      })}
    </div>
  )
}

export default TruckRoute