import { Button, Modal, Stack } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import dayjs from "dayjs"

function LoadersTimeRow({loaders}) {
  const [opened, { open, close }] = useDisclosure(false)
  
  return (
    <>
      {loaders.length > 0 ? 
        <Button variant="outline" size="xs" onClick={open}>Посмотреть</Button>
      :
        <span>нет данных</span>
      }
      <Modal opened={opened} onClose={close}>
        {loaders.length > 0 && loaders.map((loader, i) => {
          return (
            <Stack key={loader.id}>
              <h2>{`грузчик ${i + 1}`}</h2>
              <p>{`время работы на филиале: ${dayjs(loader.startTime).format('H:mm')} - ${dayjs(loader.endTime).format('H:mm')}`}</p>
              <p>{dayjs(loader.endTime).diff(dayjs(dayjs(loader.startTime)), 'minutes')} минут работы</p>
            </Stack>
          )
        })}
      </Modal>
    </>
  )
}

export default LoadersTimeRow