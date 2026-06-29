// components/EditProfileModal.tsx
import { useEffect, useState } from 'react'
import { Button, Modal } from '@heroui/react'
import { useUpdateProfile } from '../../hooks/useUpdateProfile'
import ProfileFormFields from '../../components/UserFormFields'
import { useUser } from '../../hooks/useUser'

interface EditProfileModalProps {
  triggerLabel?: string
  onSuccess?: () => void
}

const EditProfileModal = ({ triggerLabel = 'Editar perfil', onSuccess }: EditProfileModalProps) => {
  const { user } = useUser()
  const { updateProfile, isSubmitting, error } = useUpdateProfile()

  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen || !user) return

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setName(user.name ?? '')
    setBio(user.bio ?? '')
    setProfileImage(null)
    setProfileImagePreview(user.profileImage ?? null)
  }, [isOpen, user])

  useEffect(() => {
    if (!profileImage) return

    const objectUrl = URL.createObjectURL(profileImage)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProfileImagePreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [profileImage])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await updateProfile({ name, bio, profileImage })

    setIsOpen(false)
    onSuccess?.()
  }

  return (
    <>
      <Button variant="outline" className="font-medium" onClick={() => setIsOpen(true)}>
        {triggerLabel}
      </Button>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="w-full max-w-2xl rounded-2xl bg-background shadow-2xl">
              <Modal.CloseTrigger />

              <Modal.Header>
                <Modal.Heading>Editar perfil</Modal.Heading>
              </Modal.Header>

              <Modal.Body>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 pt-2">
                  {error && (
                    <div className="rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
                      {error}
                    </div>
                  )}

                  <ProfileFormFields
                    name={name}
                    bio={bio}
                    profileImagePreview={profileImagePreview}
                    onNameChange={setName}
                    onBioChange={setBio}
                    onProfileImageChange={setProfileImage}
                  />

                  <div className="flex justify-end gap-3 pt-2">
                    <Button type="submit" isPending={isSubmitting}>
                      Guardar cambios
                    </Button>
                  </div>
                </form>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  )
}

export default EditProfileModal
