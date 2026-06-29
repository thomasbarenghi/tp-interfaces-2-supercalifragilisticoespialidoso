import { useState } from 'react'
import { Button } from '@heroui/react'
import { useUpdateProfile } from '../../hooks/useUpdateProfile'
import ProfileFormFields from '../../components/UserFormFields'
import { useUser } from '../../hooks/useUser'
import FormModalShell from '../../components/FormModalShell'
import { useModalImageForm } from '../../hooks/useModalImageForm'

interface EditProfileModalProps {
  triggerLabel?: string
  onSuccess?: () => void
}

const EditProfileModal = ({ triggerLabel = 'Editar perfil', onSuccess }: EditProfileModalProps) => {
  const { user } = useUser()
  const { updateProfile, isSubmitting, error } = useUpdateProfile()
  const [isOpen, setIsOpen] = useState(false)

  const {
    textValues,
    setTextField,
    image: profileImage,
    setImage: setProfileImage,
    imagePreview: profileImagePreview,
  } = useModalImageForm({
    isOpen,
    initialTextValues: {
      name: user?.name ?? '',
      bio: user?.bio ?? '',
    },
    initialImageUrl: user?.profileImage ?? null,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await updateProfile({
      name: textValues.name,
      bio: textValues.bio,
      profileImage,
    })

    setIsOpen(false)
    onSuccess?.()
  }

  return (
    <FormModalShell
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      title="Editar perfil"
      error={error}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      submitLabel="Guardar cambios"
      trigger={
        <Button variant="outline" className="font-medium" onClick={() => setIsOpen(true)}>
          {triggerLabel}
        </Button>
      }
    >
      <ProfileFormFields
        name={textValues.name}
        bio={textValues.bio}
        profileImagePreview={profileImagePreview}
        onNameChange={(value) => setTextField('name', value)}
        onBioChange={(value) => setTextField('bio', value)}
        onProfileImageChange={setProfileImage}
      />
    </FormModalShell>
  )
}

export default EditProfileModal
