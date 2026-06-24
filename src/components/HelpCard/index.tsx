import { useNavigate } from 'react-router'
import { Comment } from '@gravity-ui/icons'
import InfoCard from '../InfoCard'
import { ROUTES } from '../../config/routes'

const HelpCard = () => {
  const navigate = useNavigate()
  return (
    <InfoCard
      icon={<Comment width={18} height={18} className="text-(--accent)" />}
      title="Necesito ayuda"
      description="Hablá con nuestro equipo"
      onClick={() => navigate(ROUTES.CONTACT)}
    />
  )
}

export default HelpCard
