import { Button, FieldError, Label, TextArea, TextField } from '@heroui/react'
import { Plus, Xmark } from '@gravity-ui/icons'
import { usePostTags } from '../../hooks/usePostTags.ts'
import type { Tag } from '../../types/tag.ts'

interface PostFormFieldsProps {
  description: string
  onDescriptionChange: (value: string) => void
  onImageChange: (file: File | null) => void
  imageRequired?: boolean
  imagePreview?: string | null
  postId: string
  postTags?: Tag[]
  isEdit?: boolean
}

const PostFormFields = ({
  description,
  onDescriptionChange,
  onImageChange,
  imageRequired = false,
  imagePreview,
  postId,
  postTags = [],
  isEdit = false,
}: PostFormFieldsProps) => {
  const { tags, isLoadingTags, isSubmitting, addTagToPost, removeTagFromPost } = usePostTags(postId)

  const selectedTagIds = new Set(postTags.map((tag) => tag._id))
  return (
    <>
      <div className="flex flex-row gap-4 items-center">
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Vista previa"
            className="mt-2 h-20 w-20 aspect-square rounded-full object-cover border border-gray-200"
          />
        )}
        <div className="flex flex-col gap-1 w-full">
          <Label>Portada</Label>

          <input
            type="file"
            accept="image/*"
            required={imageRequired}
            onChange={(e) => onImageChange(e.target.files?.[0] ?? null)}
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-red-50 file:text-red-600 hover:file:bg-red-100"
          />
        </div>
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
      {isEdit &&
        (isLoadingTags ? (
          <p>Cargando tags...</p>
        ) : (
          <div className="space-y-3 text-foreground">
            <div>
              <h3 className="mb-2 text-sm font-medium">Tags actuales</h3>
              <div className="flex flex-wrap gap-2">
                {postTags.length === 0 ? (
                  <p className="text-sm text-neutral-500">No tiene tags asignados.</p>
                ) : (
                  postTags.map((tag) => (
                    <div
                      key={tag._id}
                      className="flex items-center gap-1 rounded-full border px-3 py-1 text-sm"
                    >
                      <span>{tag.name}</span>
                      <Button
                        isDisabled={isSubmitting}
                        size="sm"
                        variant="ghost"
                        isIconOnly
                        className="hover:bg-transparent p-0 h-4 w-4"
                        onClick={() => removeTagFromPost(tag._id)}
                      >
                        <Xmark className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium">Agregar tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags
                  .filter((tag) => !selectedTagIds.has(tag._id))
                  .map((tag) => (
                    <Button
                      key={tag._id}
                      size="sm"
                      variant="outline"
                      isDisabled={isSubmitting}
                      onClick={() => addTagToPost(tag._id)}
                    >
                      <Plus className="h-4 w-4" /> {tag.name}
                    </Button>
                  ))}
              </div>
            </div>
          </div>
        ))}
    </>
  )
}

export default PostFormFields
