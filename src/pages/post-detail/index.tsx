import { useNavigate, useParams } from 'react-router'
import { Avatar } from '@heroui/react'
import { useState } from 'react'
import { usePageTitle } from '../../hooks/usePageTitle.ts'
import { usePost } from '../../hooks/usePost.ts'
import { useAuth } from '../../hooks/useAuth.ts'
import { useComments } from '../../hooks/useComments.ts'
import Main from '../../components/Main'
import TwoColumnLayout from '../../components/TwoColumnLayout'
import { ROUTES } from '../../config/routes.ts'

const formatDate = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days === 0) return 'hoy'
  if (days === 1) return 'hace 1 día'
  return `hace ${days} días`
}

const PostDetail = () => {
  usePageTitle('Publicación')
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { post, isLoading } = usePost(id!)
  const { user: authUser } = useAuth()
  const { addComment, editComment, deleteComment, isSubmitting } = useComments(id!)

  const [newText, setNewText] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingText, setEditingText] = useState('')

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newText.trim() || !authUser) return
    await addComment(newText.trim(), authUser._id || authUser.id)
    setNewText('')
  }

  const handleEdit = async (commentId: string) => {
    if (!editingText.trim()) return
    await editComment(commentId, editingText.trim())
    setEditingId(null)
  }

  const handleDelete = async (commentId: string) => {
    await deleteComment(commentId)
  }

  if (isLoading) {
    return (
      <Main>
        <TwoColumnLayout gap="xl">
          <TwoColumnLayout.Main>
            <div className="rounded-2xl bg-gray-200 dark:bg-gray-800 aspect-3/4 w-full animate-pulse" />
          </TwoColumnLayout.Main>
          <TwoColumnLayout.Sidebar>
            <div className="flex flex-col gap-4 animate-pulse pt-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800" />
                <div className="flex flex-col gap-2">
                  <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-800" />
                  <div className="h-3 w-20 rounded bg-gray-200 dark:bg-gray-800" />
                </div>
              </div>
              <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-800" />
            </div>
          </TwoColumnLayout.Sidebar>
        </TwoColumnLayout>
      </Main>
    )
  }

  if (!post) return null

  const { author } = post

  return (
    <Main>
      <TwoColumnLayout gap="xl">
        <TwoColumnLayout.Main>
          <div className="rounded-2xl overflow-hidden">
            <img
              src={post.images[0]?.url}
              alt={post.description}
              className="w-full h-full object-cover aspect-3/4"
            />
          </div>
        </TwoColumnLayout.Main>

        <TwoColumnLayout.Sidebar>
          {/* Autor */}
          <button
            className="flex items-center gap-3 text-left w-fit cursor-pointer"
            onClick={() => navigate(ROUTES.PROFILE(author._id))}
          >
            <Avatar size="md">
              <Avatar.Image src={author.profileImage} alt={author.name} className="object-cover" />
              <Avatar.Fallback>{author.name?.[0]}</Avatar.Fallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold text-base">{author.name}</span>
              <span className="text-sm text-gray-400">{formatDate(post.createdAt)}</span>
            </div>
          </button>

          {/* Descripción */}
          <p className="text-base leading-relaxed">{post.description}</p>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag._id}
                  className="px-3 py-1 text-sm rounded-full border border-current/20 text-foreground/70"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          {/* Comentarios */}
          <div className="flex flex-col gap-4 pt-2 border-t border-current/10">
            <h3 className="font-semibold text-sm text-foreground/60 uppercase tracking-wide">
              Comentarios ({post.comments?.length ?? 0})
            </h3>

            {post.comments?.map((comment) => {
              const isOwn =
                authUser &&
                (comment.userId._id === authUser._id ||
                  comment.userId._id === authUser.id ||
                  comment.userId.id === authUser.id)

              return (
                <div key={comment._id} className="flex gap-3 group">
                  <Avatar size="sm">
                    <Avatar.Image
                      src={comment.userId.profileImage}
                      alt={comment.userId.name}
                      className="object-cover"
                    />
                    <Avatar.Fallback>{comment.userId.name?.[0]}</Avatar.Fallback>
                  </Avatar>

                  <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                    <span className="text-sm font-semibold">{comment.userId.name}</span>

                    {editingId === comment._id ? (
                      <div className="flex flex-col gap-2">
                        <textarea
                          className="text-sm w-full rounded-lg border border-current/20 bg-background p-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                          rows={2}
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                        />
                        <div className="flex gap-2">
                          <button
                            className="text-xs font-medium text-primary"
                            onClick={() => handleEdit(comment._id)}
                          >
                            Guardar
                          </button>
                          <button
                            className="text-xs text-foreground/50"
                            onClick={() => setEditingId(null)}
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-foreground/80 break-words">{comment.text}</p>
                    )}
                  </div>

                  {isOwn && editingId !== comment._id && (
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <button
                        className="text-xs text-foreground/50 hover:text-foreground"
                        onClick={() => {
                          setEditingId(comment._id)
                          setEditingText(comment.text)
                        }}
                      >
                        Editar
                      </button>
                      <button
                        className="text-xs text-red-400 hover:text-red-600"
                        onClick={() => handleDelete(comment._id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  )}
                </div>
              )
            })}

            {/* Nuevo comentario */}
            {authUser && (
              <form onSubmit={handleAdd} className="flex gap-2 pt-2 border-t border-current/10">
                <Avatar size="sm">
                  <Avatar.Image
                    src={authUser.profileImage}
                    alt={authUser.name}
                    className="object-cover"
                  />
                  <Avatar.Fallback>{authUser.name?.[0]}</Avatar.Fallback>
                </Avatar>
                <div className="flex flex-1 gap-2">
                  <input
                    className="flex-1 text-sm rounded-full border border-current/20 bg-background px-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Agregar comentario..."
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                  />
                  <button
                    type="submit"
                    disabled={!newText.trim() || isSubmitting}
                    className="text-sm font-semibold text-primary disabled:opacity-40"
                  >
                    Publicar
                  </button>
                </div>
              </form>
            )}
          </div>
        </TwoColumnLayout.Sidebar>
      </TwoColumnLayout>
    </Main>
  )
}

export default PostDetail
