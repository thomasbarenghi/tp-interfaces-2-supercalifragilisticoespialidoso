import { FieldError, Input, Label, TextArea, TextField } from '@heroui/react'

interface ProfileFormFieldsProps {
  name: string
  bio: string
  profileImagePreview?: string | null
  onNameChange: (value: string) => void
  onBioChange: (value: string) => void
  onProfileImageChange: (file: File | null) => void
}

const UserFormFields = ({
  name,
  bio,
  profileImagePreview,
  onNameChange,
  onBioChange,
  onProfileImageChange,
}: ProfileFormFieldsProps) => (
  <>
    <div className="flex flex-row gap-3 items-center">
      {profileImagePreview && (
        <img
          src={profileImagePreview}
          alt="Vista previa"
          className="mt-2 h-20 w-20 aspect-square rounded-full object-cover border border-gray-200"
        />
      )}
      <div className="flex flex-col gap-1 w-full">
        <Label>Foto de perfil</Label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => onProfileImageChange(e.target.files?.[0] ?? null)}
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-red-50 file:text-red-600 hover:file:bg-red-100"
        />
      </div>
    </div>

    <div className="flex flex-col gap-1">
      <TextField
        name="name"
        isRequired
        fullWidth
        value={name}
        onChange={(value) => onNameChange(value)}
        validate={(v) => (!v ? 'Completá este campo' : null)}
      >
        <Label>Nombre</Label>
        <Input className="h-12" placeholder="Tu nombre" />
        <FieldError />
      </TextField>
    </div>

    <div className="flex flex-col gap-1">
      <TextField name="bio" fullWidth value={bio} onChange={(value) => onBioChange(value)}>
        <Label>Bio</Label>
        <TextArea className="h-32" placeholder="Contá un poco sobre vos..." />
        <FieldError />
      </TextField>
    </div>
  </>
)

export default UserFormFields
