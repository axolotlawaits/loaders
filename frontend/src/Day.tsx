import { Button, Modal, Space, Stack, Table, TextInput } from "@mantine/core"
import Loaders from "./Loaders"
import { useState } from "react"
import { useDisclosure } from "@mantine/hooks"
import { API } from "../constants"
import dayjs from "dayjs"
import LoadersTimeRow from "./LoadersTimeRow"
import NetHours from "./NetHours"
import { LoaderType } from "./Loaders"

export type FilialType = {
  id: string
  name: string
  feedback?: string
  loaders: LoaderType[]
}

export type DayType = {
  id: string,
  day: Date
  filials: FilialType[]
}

type LoadersTimeDataType = {
  startTime: Date
  endTime: Date
}

function Day({day}: {day: DayType}) {
  const [loadersNumber, setLoadersNumber] = useState(1)
  const [feedback, setFeedback] = useState('')
  const [loadersData, setLoadersData] = useState<LoadersTimeDataType[]>([])
  const [opened, { open, close }] = useDisclosure(false)

  let rows = []

  const addLoaders = async (filialId: string) => {
    const response = await fetch(`${API}/filial/${filialId}`, {
      method: 'POST',
      body: JSON.stringify({loaders: loadersData, feedback}),
      headers: { 'Content-type': 'application/json' }
    })

    if (response.ok) {
      close()
    }
  }

  const handleLoadersData = (data: string, index: number, isStart: boolean) => {
    if (isStart) {
      setLoadersData([
        ...loadersData.slice(0, index),
        {
          ...loadersData[index],
          startTime: createDateWithTime(data)
        },
        ...loadersData.slice(index + 1)
      ])
    } else {
      setLoadersData([
        ...loadersData.slice(0, index),
        {
          ...loadersData[index],
          endTime: createDateWithTime(data)
        },
        ...loadersData.slice(index + 1)
      ])
    }
  }

  let filials = day.filials

  rows = Object.values(filials).map(filial => (
    <Table.Tr key={filial.id}>
      <Table.Td>{filial.name}</Table.Td>
      <Table.Td>
        {filial.loaders.length > 0 ? 
          filial.loaders.length
        :
          <>
            <Button size="xs" variant="outline" onClick={open}>добавить</Button>
            <Modal opened={opened} onClose={close}>
              <Stack>
                {[...Array(loadersNumber)].map((_e, i) => {
                  return (
                    <Loaders 
                      key={i}
                      index={i} 
                      handleLoadersData={handleLoadersData} 
                    >
                    </Loaders>
                  )
                })}
                <Button variant="outline" onClick={() => setLoadersNumber(prev => prev + 1)}>добавить грузчика</Button>
                <TextInput 
                  label="Обратная связь" 
                  value={feedback} 
                  onChange={(e) => setFeedback(e.currentTarget.value)}
                >
                </TextInput>
                <Button onClick={() => addLoaders(filial.id)}>Подтвердить</Button>
              </Stack>
            </Modal>
          </>
        }
      </Table.Td>
      <Table.Td>
        <LoadersTimeRow loaders={filial.loaders}></LoadersTimeRow>
      </Table.Td>
      <Table.Td>{filial.feedback}</Table.Td>
    </Table.Tr>
  ))

  function createDateWithTime(timeString: string) {
    const currentDate = new Date()
    const newDateString = `${currentDate.toLocaleDateString()} ${timeString}`
    const newDate = new Date(newDateString)

    return newDate
  }

  return (
    <div key={day.id} className="day-table">
      <p>{dayjs(day.day).format('MMMM D, YYYY')}</p>
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
      <Space h="md" />
      <NetHours filials={filials}></NetHours>
    </div>
  )
}

export default Day
