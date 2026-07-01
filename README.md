# Bang — UnaHur Anti-Social Net (Frontend)

Aplicación React que constituye el frontend de la red social **Bang**, desarrollada como Trabajo Práctico de la materia Interfaces 2 (UnaHur).  
Permite registrarse, iniciar sesión, navegar publicaciones, comentar y crear posts propios.

## Instalación y ejecución

```bash
npm install
npm run dev    # http://localhost:5173
```

Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=https://anti-social-documental-tp-c1mm.onrender.com
```

> La API ya está deployada. Si querés apuntar a un backend local, reemplazá la URL.

## Páginas

| Ruta             | Vista                  | Protegida |
| ---------------- | ---------------------- | --------- |
| `/login`         | Inicio de sesión       | No        |
| `/register`      | Registro de usuario    | No        |
| `/`              | Feed de publicaciones  | Sí        |
| `/post/:id`      | Detalle de publicación | Sí        |
| `/profile`       | Perfil propio          | Sí        |
| `/profile/:nick` | Perfil de otro usuario | Sí        |
| `/contact`       | Formulario de contacto | Sí        |

Las rutas protegidas redirigen a `/login` si no hay sesión activa.

## Funcionalidades

- **Autenticación**: login con email o usuario, registro con nick/nombre/email/contraseña. Sesión persistida en `localStorage`.
- **Feed**: publicaciones paginadas con imagen, descripción, tags y conteo de comentarios.
- **Detalle de post**: descripción completa, imágenes, tags, lista de comentarios y formulario para agregar uno nuevo.
- **Perfil**: foto, nombre, nickname, bio, seguidores/seguidos y grilla de posts del usuario. Posibilidad de editar el perfil y seguir/dejar de seguir.
- **Crear publicación**: modal accesible desde el header con imagen, descripción y tags.
- **Dark mode**: toggle en el header, persistido en `localStorage`.

## Stack

| Tecnología         | Uso                            |
| ------------------ | ------------------------------ |
| **React 19**       | UI                             |
| **TypeScript**     | Tipado estático                |
| **Vite 5**         | Bundler                        |
| **React Router 7** | Navegación y rutas protegidas  |
| **HeroUI 3**       | Componentes de UI              |
| **Tailwind CSS 4** | Utilidades de layout y estilos |
| **SWR**            | Data fetching y caché          |
| **Sonner**         | Notificaciones toast           |
| **Storybook**      | Documentación de componentes   |

## Comandos

```bash
npm run dev            # Servidor de desarrollo
npm run build          # Build de producción
npm run lint           # ESLint
npm run format         # Prettier
npm run storybook      # Storybook en http://localhost:6006
npm run build-storybook # Build estático de Storybook
```

## Tokens semánticos de HeroUI

HeroUI expone variables CSS que cambian automáticamente entre light y dark mode. Siempre preferir estas clases sobre colores hardcodeados de Tailwind.

| Clase             | Uso                               |
| ----------------- | --------------------------------- |
| `text-foreground` | Texto principal                   |
| `text-muted`      | Texto secundario                  |
| `text-accent`     | Acción principal / color de marca |
| `bg-background`   | Fondo de página                   |
| `bg-surface`      | Fondo de cards y paneles          |
| `border-border`   | Bordes generales                  |

## Convenciones

- Solo **arrow functions** (regla de ESLint activa)
- `const` siempre que no se reasigne, sin `var`
- Pre-commit corre ESLint + Prettier automáticamente vía Husky
