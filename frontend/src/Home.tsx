import { Card, Button, TextInput, MultiSelect, Stack, Select, Modal } from '@mantine/core'
import './assets/styles/Home.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { API } from '../constants'
import { useDisclosure } from '@mantine/hooks';

const rrsInitData = ['Алтай', 'Барнаул', 'Кемерово', 'Новокузнецк', 'Новосибирск', 'Новосибирская область', 'Омск', 'Томск']

type RouteType = {
  id: string
  name: string
}

function Home() {
  const [name, setName] = useState('')
  const [rrs, setRrs] = useState<string | null>('')
  const [filialsData, setFilialsData] = useState([])
  const [filialSearch, setFilialSearch] = useState('')
  const [filials, setFilials] = useState<string[]>([])
  const [routes, setRoutes] = useState([])
  const [opened, { open, close }] = useDisclosure(false)

  useEffect(() => {
    const getRoutes = async () => {
      const response = await fetch(`${API}/route`)
      const routes = await response.json()
      if (response.ok) {
        setRoutes(routes)
      }
    }
    getRoutes()
  }, [])

  useEffect(() => {
    const getFilials = async () => {
      const response = await fetch(`${API}/filials`)
      const filials = await response.json()
      if (response.ok) {
        setFilialsData(filials)
      }
    }
    getFilials()
  }, [])

  const createRoute = async () => {
    const response = await fetch(`${API}/route`, {
      method: 'POST',
      body: JSON.stringify({name, rrs, filials}),
      headers: { 'Content-type': 'application/json' }
    })
    const json = await response.json()
    if (response.ok) {
      setRoutes(json)
    }
  }
  console.log(filials)
  return (
    <div id='routes-page-wrapper'>
      <Button onClick={open}>создать новый маршрут</Button>
      <Modal opened={opened} onClose={close}>
        <Stack gap="md">
          <TextInput
            placeholder='Наименование'
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <Select data={rrsInitData} value={rrs} onChange={setRrs} placeholder='Выбрать РРС'/>
          <MultiSelect 
            data={filialsData} 
            searchValue={filialSearch} 
            onSearchChange={setFilialSearch}
            placeholder='Выбрать филиалы'
            value={filials}
            onChange={setFilials}
            searchable 
          />
          <Button onClick={createRoute}>создать</Button>
        </Stack>
      </Modal>
      <div id='routes-wrapper'>
        {routes.length > 0 && routes.map((route: RouteType) => {
          return (
            <Link key={route.id} to={`/route/${route.id}`}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <p>{route.name}</p>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Home