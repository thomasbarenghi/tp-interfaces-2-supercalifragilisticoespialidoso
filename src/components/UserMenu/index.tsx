import { Avatar, Dropdown } from '@heroui/react'
import { useNavigate } from 'react-router'
import { useAuth } from '../../hooks/useAuth'
import { ROUTES } from '../../config/routes'
import { useUser } from '../../hooks/useUser.ts'

const UserMenu = () => {
  const { logout } = useAuth()
  const { user } = useUser()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <Dropdown>
      <Dropdown.Trigger className="flex items-center gap-2 cursor-pointer rounded-full outline-none">
        <Avatar size="sm">
          <Avatar.Image src={user?.profileImage} alt={user?.name} className="object-cover" />
          <Avatar.Fallback>{user?.name?.[0]}</Avatar.Fallback>
        </Avatar>
        <span className="font-medium text-sm hidden xl:block">{user?.name}</span>
      </Dropdown.Trigger>

      <Dropdown.Popover>
        <Dropdown.Menu>
          <Dropdown.Item
            id="profile"
            textValue="Ver mi perfil"
            onAction={() => navigate(ROUTES.PROFILE(user?.nickName ?? ''))}
          >
            Ver mi perfil
          </Dropdown.Item>
          <Dropdown.Item id="logout" textValue="Cerrar sesión" onAction={handleLogout}>
            Cerrar sesión
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}

export default UserMenu
