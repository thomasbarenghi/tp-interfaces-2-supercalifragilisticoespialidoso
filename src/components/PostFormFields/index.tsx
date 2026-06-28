import { FieldError, Label, TextArea, TextField } from '@heroui/react'

interface PostFormFieldsProps {
  description: string
  onDescriptionChange: (value: string) => void
  onImageChange: (file: File | null) => void
  imageRequired?: boolean
  imageHint?: string
}

const PostFormFields = ({
  description,
  onDescriptionChange,
  onImageChange,
  imageRequired = false,
  imageHint,
}: PostFormFieldsProps) => (
  <>
    <div className="flex flex-col gap-1">
      <Label>Portada</Label>
      <input
        type="file"
        accept="image/*"
        required={imageRequired}
        onChange={(e) => onImageChange(e.target.files?.[0] ?? null)}
        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-red-50 file:text-red-600 hover:file:bg-red-100"
      />
      {imageHint && <p className="text-sm text-gray-400">{imageHint}</p>}
    </div>

    <div className="flex flex-col gap-1">
      <TextField
        name="message"
        isRequired
        fullWidth
        value={description}
        onChange={(value) => onDescriptionChange(value)}
        validate={(v) => (!v ? 'Completá este campo' : null)}
      >
        <Label>Descripcion</Label>
        <TextArea className="h-32" placeholder="Contanos en que te podemos ayudar..." />
        <FieldError />
      </TextField>
    </div>
  </>
)

export default PostFormFields
