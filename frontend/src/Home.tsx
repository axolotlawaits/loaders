import { Card, Button, TextInput, MultiSelect, Stack, Select, Modal, Divider } from '@mantine/core'
import './assets/styles/Home.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { API } from '../constants'
import { useDisclosure } from '@mantine/hooks';
import { FilialType } from './Day';
import dayjs from 'dayjs';
import RouteEdit from './RouteEdit';

export const rrsInitData = ['Алтай', 'Барнаул', 'Кемерово', 'Новокузнецк', 'Новосибирск', 'Новосибирская область', 'Омск', 'Томск']

type RouteType = {
  id: string
  name: string
  filials: FilialType[]
  createdAt: string
}

function Home() {
  const [name, setName] = useState('')
  const [contractor, setContractor] = useState('')
  const [rrs, setRrs] = useState<string | null>('Новосибирск')
  const [filialsData, setFilialsData] = useState([])
  const [filialSearch, setFilialSearch] = useState('')
  const [filials, setFilials] = useState<string[]>([])
  const [routes, setRoutes] = useState<RouteType[]>([])
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
      const response = await fetch(`${API}/filials/${rrs}`)
      const filials = await response.json()
      if (response.ok) {
        setFilialsData(filials)
      }
    }
    getFilials()
  }, [rrs])

  const createRoute = async () => {
    const response = await fetch(`${API}/route`, {
      method: 'POST',
      body: JSON.stringify({name, contractor, rrs, filials}),
      headers: { 'Content-type': 'application/json' }
    })
    const json = await response.json()
    if (response.ok) {
      setRoutes([...routes, json])
      close()
    }
  }

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
          <TextInput
            placeholder='Подрядчик'
            value={contractor}
            onChange={(e) => setContractor(e.currentTarget.value)}
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
            <div key={route.id} >
              <Card shadow="sm" padding="lg" radius="md" withBorder className='route-card'>
                <Link className='card-text-link' to={`/route/${route.id}`}>{route.name}</Link>
                <div>
                  {route.filials.map(filial => {
                    return (
                      <p key={filial.id}>{filial.name}</p>
                    )
                  })}
                </div>
                <Divider my="md" />
                <div className='route-card-footer'>
                  <span className='route-created'>{dayjs(route.createdAt).format('MMMM D, YYYY')}</span>
                  <RouteEdit route={route} filialsData={filialsData} />
                </div>
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home