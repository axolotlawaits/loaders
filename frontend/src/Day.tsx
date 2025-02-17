import { Button, Modal, Space, Stack, Table, TextInput } from "@mantine/core"
import Loaders from "./Loaders"
import { useState } from "react"
import { useDisclosure } from "@mantine/hooks"
import { API } from "../constants"
import dayjs from "dayjs"
import LoadersTimeRow from "./LoadersTimeRow"
import NetHours from "./NetHours"

function Day({day}) {
  const [loadersNumber, setLoadersNumber] = useState(1)
  const [feedback, setFeedback] = useState('')
  const [loadersData, setLoadersData] = useState([])
  const [opened, { open, close }] = useDisclosure(false)

  let rows = []

  const addLoaders = async (filialId) => {
    const response = await fetch(`${API}/filial/${filialId}`, {
      method: 'POST',
      body: JSON.stringify({loaders: loadersData, feedback}),
      headers: { 'Content-type': 'application/json' }
    })
    const updatedFilial = await response.json()
    if (response.ok) {
      console.log(updatedFilial)
    }
  }

  const handleLoadersData = (data, index, isStart) => {
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

  rows = Object.keys(filials).map(filial => (
    <Table.Tr key={filials[filial].id}>
      <Table.Td>{filials[filial].name}</Table.Td>
      <Table.Td>
        {filials[filial].loaders.length > 0 ? 
          filials[filial].loaders.length
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
                      loadersData={loadersData} 
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
                <Button onClick={() => addLoaders(filials[filial].id)}>Подтвердить</Button>
              </Stack>
            </Modal>
          </>
        }
      </Table.Td>
      <Table.Td>
        <LoadersTimeRow loaders={filials[filial].loaders}></LoadersTimeRow>
      </Table.Td>
      <Table.Td>{filials[filial].feedback}</Table.Td>
    </Table.Tr>
  ))

  function createDateWithTime(timeString) {
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
