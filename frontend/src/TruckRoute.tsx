import { Button, Modal, Stack, Table, TextInput } from "@mantine/core"
import { DateInput } from '@mantine/dates'
import { useDisclosure } from "@mantine/hooks"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { API } from "../constants"
import './assets/styles/Route.css'
import moment from 'moment'
import 'moment/dist/locale/ru'
import dayjs from 'dayjs'
import Loaders from "./Loaders"

function TruckRoute() {
  const routeParams = useParams()
  const [opened, { open, close }] = useDisclosure(false)
  const [day, setDay] = useState<Date | null>(null)
  const [days, setDays] = useState([])
  const [loadersNumber, setLoadersNumber] = useState(1)
  const [feedback, setFeedback] = useState('')
  const [loadersData, setLoadersData] = useState([])
  
  let rows = []

  function createDateWithTime(timeString) {
    const currentDate = new Date()
    const newDateString = `${currentDate.toLocaleDateString()} ${timeString}`
    const newDate = new Date(newDateString)

    return newDate
}

  const handleLoadersData = (data, index, isStart) => {
    if (isStart) {
      setLoadersData([
        ...loadersData.slice(0, index),
        {
          ...loadersData[index],
          start: createDateWithTime(data)
        },
        ...loadersData.slice(index + 1)
      ])
    } else {
      setLoadersData([
        ...loadersData.slice(0, index),
        {
          ...loadersData[index],
          end: createDateWithTime(data)
        },
        ...loadersData.slice(index + 1)
      ])
    }
  }

  for (let day of days) {
    let filials = day.route.filials

    rows = Object.keys(filials).map(filial => (
      <Table.Tr>
        <Table.Td>{filials[filial].name}</Table.Td>
        <Table.Td>
          {filials[filial].loaders.length > 0 ? 
            filials[filial].loaders.length
          :
            <>
              <Button size="xs" variant="light" onClick={open}>добавить</Button>
              <Modal opened={opened} onClose={close}>
                <Stack>
                  {[...Array(loadersNumber)].map((_e, i) => {
                    console.log(i, filials[filial].name)
                    return (
                      <Loaders index={i} loadersData={loadersData} handleLoadersData={handleLoadersData} filialId={filials[filial].name}></Loaders>
                    )
                  })}
                  <Button variant="light" onClick={() => setLoadersNumber(prev => prev + 1)}>добавить грузчика</Button>
                  <TextInput 
                    label="Обратная связь" 
                    value={feedback} 
                    onChange={(e) => setFeedback(e.currentTarget.value)}
                  >
                  </TextInput>
                  <Button>Подтвердить</Button>
                </Stack>
              </Modal>
            </>
          }
        </Table.Td>
        <Table.Td>time</Table.Td>
        <Table.Td>feedback</Table.Td>
      </Table.Tr>
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