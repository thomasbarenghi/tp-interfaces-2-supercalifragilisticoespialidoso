// pages/profile/EditProfile.tsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { usePageTitle } from '../../hooks/usePageTitle'
import { useUpdateProfile } from '../../hooks/useUpdateProfile'
import FormPageLayout from '../../components/FormPageLayout'
import ProfileFormFields from '../../components/UserFormFields'
import { ROUTES } from '../../config/routes'
import { useUser } from '../../hooks/useUser.ts'

const EditProfile = () => {
  usePageTitle('Editar perfil')
  const navigate = useNavigate()
  const { user } = useUser()
  const { updateProfile, isSubmitting, error } = useUpdateProfile()

  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setName(user.name ?? '')
    setBio(user.bio ?? '')
    setProfileImagePreview(user.profileImage ?? null)
  }, [user])

  useEffect(() => {
    if (!profileImage) return

    const objectUrl = URL.createObjectURL(profileImage)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProfileImagePreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [profileImage])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const updated = await updateProfile({ name, bio, profileImage })
    navigate(ROUTES.PROFILE(updated._id ?? updated.id))
  }

  return (
    <FormPageLayout
      title="Editar perfil"
      subtitle="Actualizá tu nombre, bio y foto de perfil"
      submitLabel="Guardar cambios"
      isSubmitting={isSubmitting}
      error={error}
      onSubmit={handleSubmit}
    >
      <ProfileFormFields
        name={name}
        bio={bio}
        profileImagePreview={profileImagePreview}
        onNameChange={setName}
        onBioChange={setBio}
        onProfileImageChange={setProfileImage}
      />
    </FormPageLayout>
  )
}

export default EditProfile
