import { Card, Button, TextInput, MultiSelect, Stack } from '@mantine/core'
import './assets/styles/Home.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { API } from '../constants'

function Home() {
  const [name, setName] = useState('')
  const [rrs, setRrs] = useState('')
  const [filialsData, setFilialsData] = useState([])
  const [filialSearch, setFilialSearch] = useState('')
  const [filials, setFilials] = useState<string[]>([])
  const [routes, setRoutes] = useState([])

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
    <div id='routes-wrapper'>
      <Stack gap="md">
        <TextInput
          placeholder='наименование'
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <TextInput
          placeholder='ррс'
          value={rrs}
          onChange={(e) => setRrs(e.currentTarget.value)}
        />
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
      {routes.length > 0 && routes.map(route => {
        return (
          <Link key={route.id} to={`/route/${route.id}`}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <p>{route.name}</p>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}

export default Home