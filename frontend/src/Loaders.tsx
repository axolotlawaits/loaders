import { ActionIcon, Stack } from "@mantine/core"
import { TimeInput } from "@mantine/dates"
import { IconClock } from "@tabler/icons-react";
import { useRef, useState } from "react";
import { API } from "../constants";

function Loaders({index, loadersData, handleLoadersData, filialId}) {
  const startTimeRef = useRef<HTMLInputElement>(null)
  const [startTime, setStartTime] = useState('')
  const endTimeRef = useRef<HTMLInputElement>(null)
  const [endTime, setEndTime] = useState('')

  const pickerControl = (
    <ActionIcon variant="subtle" color="gray" onClick={() => startTimeRef.current?.showPicker()}>
      <IconClock size={16} stroke={1.5} />
    </ActionIcon>
  );

  const pickerControl2 = (
    <ActionIcon variant="subtle" color="gray" onClick={() => endTimeRef.current?.showPicker()}>
      <IconClock size={16} stroke={1.5} />
    </ActionIcon>
  );

  const addLoaders = async () => {
    const response = await fetch(`${API}/filial/${routeParams.id}`, {
      method: 'POST',
      body: JSON.stringify({loaders: loadersData, feedback}),
      headers: { 'Content-type': 'application/json' }
    })
  }

  const updateLoadersData = (e, isStart) => {
    if (isStart) {
      setStartTime(e.currentTarget.value)
    } else {
      setEndTime(e.currentTarget.value)
    }
    
    handleLoadersData(e.currentTarget.value, index, isStart)
  }

  console.log([filialId, index])
  return (
    <Stack gap={10}>
      <p>{`Грузчик ${index + 1}`}</p>
      <p>Время начала</p>
      <TimeInput 
        value={startTime}
        onChange={(e) => updateLoadersData(e, true)}
        ref={startTimeRef} 
        rightSection={pickerControl}
      />
      <p>Время конца</p>
      <TimeInput 
        value={endTime}
        onChange={(e) => updateLoadersData(e, false)}
        ref={endTimeRef} 
        rightSection={pickerControl2}
      />
    </Stack>
  )
}

export default Loaders