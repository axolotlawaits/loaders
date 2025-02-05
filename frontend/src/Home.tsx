import { Card } from '@mantine/core'
import './assets/styles/Home.css'
import { useNavigate, Link } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div id='routes-wrapper'>
      <Link to='route1'>
        <Card shadow="sm" padding="lg" radius="md" withBorder onClick={}>
          <p>Маршрут 1</p>
        </Card>
      </Link>
      <Link to='route2'>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <p>Маршрут 2</p>
        </Card>
      </Link>
      <Link to='route3'>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <p>Маршрут 3</p>
        </Card>
      </Link>
    </div>
  )
}

export default Home