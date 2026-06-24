import { useState } from 'react'
import useSWR from 'swr'
import axios from 'axios'
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Chip,
  Separator,
  Skeleton,
  Spinner,
  Switch,
  Tabs,
} from '@heroui/react'
import { useDarkMode } from '../hooks/useDarkMode'

interface User {
  id: number
  name: string
  email: string
}

const fetcher = (url: string) => axios.get<User[]>(url).then((res) => res.data)

const Demo = () => {
  const { dark, toggle } = useDarkMode()
  const [enabled, setEnabled] = useState(false)
  const { data: users, error, isLoading, mutate } = useSWR('http://localhost:3008/users', fetcher)

  return (
    <div className="min-h-screen bg-background flex flex-col items-center gap-10 p-10">
      <div className="w-full max-w-2xl flex items-center justify-between">
        <h1 className="text-4xl font-bold text-foreground">HeroUI Demo</h1>
        <Switch isSelected={dark} onChange={toggle}>
          <Switch.Content>{dark ? '🌙' : '☀️'}</Switch.Content>
        </Switch>
      </div>

      {/* Buttons */}

      <section className="flex flex-col gap-3 w-full max-w-2xl">
        <h2 className="text-lg font-semibold text-muted">Buttons</h2>
        <div className="flex gap-3 flex-wrap">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </section>

      <Separator />

      {/* Alerts */}
      <section className="flex flex-col gap-3 w-full max-w-2xl">
        <h2 className="text-lg font-semibold text-muted">Alerts</h2>
        <Alert status="default">
          <Alert.Title>Info</Alert.Title>
          <Alert.Description>Esto es un mensaje informativo.</Alert.Description>
        </Alert>
        <Alert status="success">
          <Alert.Title>Éxito</Alert.Title>
          <Alert.Description>La operación se completó correctamente.</Alert.Description>
        </Alert>
        <Alert status="warning">
          <Alert.Title>Atención</Alert.Title>
          <Alert.Description>Revisá los datos antes de continuar.</Alert.Description>
        </Alert>
        <Alert status="danger">
          <Alert.Title>Error</Alert.Title>
          <Alert.Description>Algo salió mal. Intentá de nuevo.</Alert.Description>
        </Alert>
      </section>

      <Separator />

      {/* Chips + Badges + Avatars */}
      <section className="flex flex-col gap-4 w-full max-w-2xl">
        <h2 className="text-lg font-semibold text-muted">Chips · Badges · Avatars</h2>
        <div className="flex gap-2 flex-wrap">
          <Chip color="default">Default</Chip>
          <Chip color="accent">Accent</Chip>
          <Chip color="success">Success</Chip>
          <Chip color="warning">Warning</Chip>
          <Chip color="danger">Danger</Chip>
        </div>
        <div className="flex gap-4">
          <Badge>
            <Badge.Anchor>
              <Avatar>
                <Avatar.Fallback>JD</Avatar.Fallback>
              </Avatar>
            </Badge.Anchor>
            <Badge.Label color="success">3</Badge.Label>
          </Badge>
          <Badge>
            <Badge.Anchor>
              <Avatar>
                <Avatar.Fallback>AB</Avatar.Fallback>
              </Avatar>
            </Badge.Anchor>
            <Badge.Label color="danger">!</Badge.Label>
          </Badge>
        </div>
      </section>

      <Separator />

      {/* Switch */}
      <section className="flex flex-col gap-3 w-full max-w-2xl">
        <h2 className="text-lg font-semibold text-muted">Switch</h2>
        <Switch isSelected={enabled} onChange={() => setEnabled((v) => !v)}>
          <Switch.Content>{enabled ? 'Activado' : 'Desactivado'}</Switch.Content>
        </Switch>
      </section>

      <Separator />

      {/* Tabs */}
      <section className="flex flex-col gap-3 w-full max-w-2xl">
        <h2 className="text-lg font-semibold text-muted">Tabs</h2>
        <Tabs>
          <Tabs.List>
            <Tabs.Tab id="perfil">Perfil</Tabs.Tab>
            <Tabs.Tab id="config">Configuración</Tabs.Tab>
            <Tabs.Tab id="notifs">Notificaciones</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel id="perfil" className="p-4">
            Contenido del perfil.
          </Tabs.Panel>
          <Tabs.Panel id="config" className="p-4">
            Opciones de configuración.
          </Tabs.Panel>
          <Tabs.Panel id="notifs" className="p-4">
            No tenés notificaciones.
          </Tabs.Panel>
        </Tabs>
      </section>

      <Separator />

      {/* API fetch */}
      <section className="flex flex-col gap-4 w-full max-w-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-muted">Usuarios desde API</h2>
          <Button variant="outline" onClick={() => mutate()}>
            Recargar
          </Button>
        </div>

        {isLoading && (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((n) => (
              <Skeleton key={n} className="h-16 rounded-xl" />
            ))}
          </div>
        )}

        {error && (
          <Alert status="danger">
            <Alert.Title>No se pudo conectar</Alert.Title>
            <Alert.Description>{error.message}</Alert.Description>
          </Alert>
        )}

        {users && (
          <div className="flex flex-col gap-3">
            {users.map((user) => (
              <Card key={user.id}>
                <Card.Content className="flex items-center gap-4">
                  <Avatar>
                    <Avatar.Fallback>{user.name.slice(0, 2).toUpperCase()}</Avatar.Fallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{user.name}</p>
                    <p className="text-sm text-muted">{user.email}</p>
                  </div>
                  <Spinner className="ml-auto hidden" />
                </Card.Content>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Demo
