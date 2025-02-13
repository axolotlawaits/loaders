import { Button, Modal, Stack, Table, TextInput } from "@mantine/core"
import Loaders from "./Loaders"
import { useState } from "react"
import { useDisclosure } from "@mantine/hooks"
import { API } from "../constants"

function DayRouteRow({filials, filial}) {
  const [loadersNumber, setLoadersNumber] = useState(1)
  const [feedback, setFeedback] = useState('')
  const [loadersData, setLoadersData] = useState([])
  const [opened, { open, close }] = useDisclosure(false)

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

  const addLoaders = async () => {
    const response = await fetch(`${API}/filial/${filials[filial].id}`, {
      method: 'POST',
      body: JSON.stringify({loaders: loadersData, feedback}),
      headers: { 'Content-type': 'application/json' }
    })
    const updatedFilial = await response.json()
    if (response.ok) {
      console.log(updatedFilial)
    }
  }
  console.log(loadersData)
  return (
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
                  return (
                    <Loaders 
                      index={i} 
                      loadersData={loadersData} 
                      handleLoadersData={handleLoadersData} 
                    >
                    </Loaders>
                  )
                })}
                <Button variant="light" onClick={() => setLoadersNumber(prev => prev + 1)}>добавить грузчика</Button>
                <TextInput 
                  label="Обратная связь" 
                  value={feedback} 
                  onChange={(e) => setFeedback(e.currentTarget.value)}
                >
                </TextInput>
                <Button onClick={addLoaders}>Подтвердить</Button>
              </Stack>
            </Modal>
          </>
        }
      </Table.Td>
      <Table.Td>
        <Button onClick={open}>Время работы</Button>
        <Modal opened={opened} onClose={close}>
          {filials[filial].loaders.length > 0 && filials[filial].loaders.map(loader => {
            return (
              <Stack>
                <h1>грузчик 1</h1>
                <p>{`время работы на филиале: ${loader.startTime} - ${loader.endTime}`}</p>
              </Stack>
            )
          })}
        </Modal>
      </Table.Td>
      <Table.Td>{filials[filial].feedback}</Table.Td>
    </Table.Tr>
  )
}

export default DayRouteRow
