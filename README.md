# Task Manager Frontend

WebApp para la gestión de tareas construida con React, Vite, Material-UI y React Router.

## Requisitos previos

- Node.js 18+ (recomendado Node.js 20+)
- npm 8+ o yarn 1.22+
- De preferencia usar [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm) para manejar versiones de Node.js

## Configuración del entorno

### 1. Instalar Node.js usando nvm (recomendado). En caso de tenerlo ignorar este punto y saltar al clonar

```bash
# Instalar nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Reiniciar la terminal o ejecutar
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Instalar Node.js (versión LTS)
nvm install --lts
nvm use --lts
```

### 2. Clonar el repositorio

```bash
git clone <URL-del-repositorio>
cd task-manager-front
```

### 3. Instalar dependencias

```bash
# Con npm
npm install

# O con yarn
yarn install
```

### 4. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables: 

```
VITE_API_URL=http://localhost:5102
```

Ajusta la URL según la configuración de tu API backend.

## Ejecución de la aplicación

### Entorno de desarrollo

```bash
# Con npm
npm run dev

# O con yarn
yarn dev
```

La aplicación estará disponible en `http://localhost:7000` (o el puerto que se configure).

### Compilar para producción

```bash
# Con npm
npm run build

# O con yarn
yarn build
```

### Vista previa de la versión de producción

```bash
# Con npm
npm run preview

# O con yarn
yarn preview
```


## Tecnologías utilizadas

- **React**
- **Vite**
- **React Router**
- **Material-UI**
- **Axios**
- **TailwindCSS**

## Decisiones tomadas:


## Características principales

- Autenticación de usuarios (login/registro)
- Gestión de tareas (crear, editar, eliminar)
- Filtrado de tareas por estado y fecha
- Diseño responsive para dispositivos móviles y escritorio


