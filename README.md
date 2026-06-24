# Hero — Cliente (Frontend)

Aplicación React que constituye el frontend de la tienda Hero. Permite explorar el catálogo, agregar productos al
carrito y completar una compra simulada.

## Instalación y ejecución

> Requiere el servidor corriendo en `http://localhost:3008`. Ver [`../server/README.md`](../server/README.md).

```bash
npm install
npm run dev    # http://localhost:5173
```

Variable de entorno (crear `client/.env`):

```env
VITE_API_URL=http://localhost:3008
```

## Páginas

| Ruta                | Vista                           |
| ------------------- | ------------------------------- |
| `/`                 | Inicio                          |
| `/list`             | Catálogo con filtros y búsqueda |
| `/product/:slug`    | Detalle de producto             |
| `/cart`             | Carrito de compras              |
| `/checkout`         | Formulario de compra            |
| `/checkout/success` | Confirmación de pedido          |
| `/contact`          | Formulario de contacto          |
| `/tracking`         | Seguimiento de pedido           |

---

## Stack

- **React 19** con React Compiler habilitado
- **Vite 5** como bundler
- **HeroUI 3** como librería de componentes
- **Tailwind CSS 4** para utilidades de layout y espaciado
- **Zustand** para estado global
- **SWR + Axios** para data fetching
- **React Router 7** para navegación

## Tokens semánticos de HeroUI

HeroUI expone variables CSS que cambian automáticamente entre light y dark mode.
Siempre preferir estas clases sobre colores hardcodeados de Tailwind (`gray-*`, `white`, etc.).

### Colores de texto

| Clase Tailwind    | Variable       | Uso                                  |
| ----------------- | -------------- | ------------------------------------ |
| `text-foreground` | `--foreground` | Texto principal                      |
| `text-muted`      | `--muted`      | Texto secundario, labels, subtítulos |
| `text-link`       | `--link`       | Links                                |

### Fondos

| Clase Tailwind         | Variable              | Uso                                    |
| ---------------------- | --------------------- | -------------------------------------- |
| `bg-background`        | `--background`        | Fondo de la página                     |
| `bg-surface`           | `--surface`           | Fondo de cards y paneles               |
| `bg-surface-secondary` | `--surface-secondary` | Fondo de secciones secundarias         |
| `bg-surface-tertiary`  | `--surface-tertiary`  | Fondo de hover states o capas anidadas |
| `bg-field-background`  | `--field-background`  | Fondo de inputs y campos de formulario |
| `bg-overlay`           | `--overlay`           | Fondo de modals y drawers              |

### Bordes

| Clase Tailwind     | Variable      | Uso                    |
| ------------------ | ------------- | ---------------------- |
| `border-border`    | `--border`    | Bordes generales       |
| `border-separator` | `--separator` | Separadores y dividers |

### Colores de estado

| Clase Tailwind | Variable    | Uso               |
| -------------- | ----------- | ----------------- |
| `text-accent`  | `--accent`  | Acción principal  |
| `text-success` | `--success` | Éxito             |
| `text-warning` | `--warning` | Advertencia       |
| `text-danger`  | `--danger`  | Error / peligro   |
| `bg-accent`    | `--accent`  | Fondo acento      |
| `bg-success`   | `--success` | Fondo éxito       |
| `bg-warning`   | `--warning` | Fondo advertencia |
| `bg-danger`    | `--danger`  | Fondo error       |

### Utilidades propias de HeroUI

| Clase              | Uso                                                 |
| ------------------ | --------------------------------------------------- |
| `focus-ring`       | Ring de foco accesible (reemplaza `outline` manual) |
| `focus-field-ring` | Ring de foco para inputs                            |
| `status-disabled`  | Aplica opacidad y cursor deshabilitado              |
| `status-pending`   | Bloquea pointer events mientras carga               |

### Ejemplo

```tsx
// Evitar
<p className="text-gray-900 dark:text-white bg-white dark:bg-gray-900">

// Preferir
<p className="text-foreground bg-background">
```

## Convenciones

- Solo **arrow functions** (regla de ESLint activa)
- `const` siempre que no se reasigne
- Sin `var`
- Pre-commit corre ESLint + Prettier automáticamente vía Husky

## Comandos

```bash
npm run dev          # servidor de desarrollo
npm run build        # build de producción
npm run lint         # linter
npm run format       # formatear con Prettier
npm run format:check # verificar formato sin escribir
```
