import { Button, Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import dayjs from "dayjs"
import { FilialType } from "./Day"

function NetHours({filials}: {filials: FilialType[]}) {
  const [opened, { open, close }] = useDisclosure(false)  

  function calculateWorkHours() {
    let obj: Record<number, number> = {}
    for (let filial in filials) {
      for (let [index, loader] of filials[filial].loaders.entries()) {
        obj[index] = (obj[index] || 0) + dayjs(loader.endTime).diff(dayjs(dayjs(loader.startTime)), 'minutes')
      }
    }
    return Object.values(obj)
  }

  function calculateTotalTime() {
    return calculateWorkHours().reduce((total, cur) => total + cur, 0)
  }

  return (
    <>
      <Button onClick={open} variant="light">общее количество работы грузчиков</Button>
      <Modal opened={opened} onClose={close}>
        {calculateWorkHours().length > 0 && calculateWorkHours().map((loader, index) => {
          return (
            <p key={index}>{`Общее время работы ${index + 1} грузчика - ${loader} минут`}</p>
          )
        })}
        <p>{`Общее время работы по всем грузчикам - ${calculateTotalTime()} минут`}</p>
      </Modal>
    </>
  )
}

export default NetHours