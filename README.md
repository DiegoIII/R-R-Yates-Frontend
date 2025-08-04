# R-R Yates Acapulco - Frontend

Frontend de Next.js para el sistema de reservas de yates en Acapulco.

## 🚀 Características

- **Autenticación completa**: Registro e inicio de sesión de usuarios
- **Gestión de yates**: Catálogo completo con búsqueda y filtros
- **Sistema de reservas**: Creación y gestión de reservas
- **Panel de administración**: Gestión avanzada para administradores
- **Diseño responsive**: Interfaz moderna y adaptable

## 🏗️ Arquitectura

El proyecto está estructurado con:

- **Next.js 15** con App Router
- **TypeScript** para tipado estático
- **Tailwind CSS** para estilos
- **Context API** para manejo de estado global
- **Microservicios** conectados vía REST API

### Estructura de archivos

```
src/
├── app/                    # Páginas de Next.js
│   ├── login/             # Página de inicio de sesión
│   ├── register/          # Página de registro
│   └── layout.tsx         # Layout principal
├── components/            # Componentes reutilizables
│   └── ProtectedRoute.tsx # Protección de rutas
├── contexts/              # Contextos de React
│   └── AuthContext.tsx    # Contexto de autenticación
├── hooks/                 # Hooks personalizados
│   └── useApi.ts          # Hook para llamadas API
├── lib/                   # Utilidades y configuraciones
│   └── api.ts             # Funciones de API
└── config/                # Configuraciones
    └── environment.ts     # Variables de entorno
```

## 🔧 Configuración

### Prerrequisitos

- Node.js 18+ 
- npm o yarn
- Backend corriendo en los puertos configurados

### Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_USER_SERVICE_URL=http://localhost:8083
NEXT_PUBLIC_BOOKING_SERVICE_URL=http://localhost:8082
NEXT_PUBLIC_CATALOG_SERVICE_URL=http://localhost:8081
```

### Instalación

1. Clona el repositorio:
```bash
git clone <repository-url>
cd r-r-yates-frontend
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno (opcional):
```bash
cp .env.example .env.local
```

4. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🔌 Endpoints Conectados

### Servicio de Usuarios (Puerto 8083)
- `POST /api/users/register` - Registro de usuarios
- `POST /api/users/login` - Inicio de sesión
- `GET /api/users/{id}` - Obtener usuario por ID
- `GET /api/users` - Listar usuarios (ADMIN)
- `PUT /api/users/{id}` - Actualizar usuario (ADMIN)
- `DELETE /api/users/{id}` - Eliminar usuario (ADMIN)

### Servicio de Catálogo (Puerto 8081)
- `GET /api/catalog/yachts` - Listar yates
- `GET /api/catalog/yachts/{id}` - Obtener yate por ID
- `POST /api/catalog/yachts` - Crear yate (ADMIN)
- `PUT /api/catalog/yachts/{id}` - Actualizar yate (ADMIN)
- `DELETE /api/catalog/yachts/{id}` - Eliminar yate (ADMIN)
- `PATCH /api/catalog/yachts/{id}/availability` - Cambiar disponibilidad
- `GET /api/catalog/yachts/search` - Buscar yates
- `GET /api/catalog/yachts/type/{type}` - Yates por tipo
- `GET /api/catalog/yachts/location` - Yates por ubicación

### Servicio de Reservas (Puerto 8082)
- `POST /api/bookings` - Crear reserva
- `GET /api/bookings` - Listar reservas
- `GET /api/bookings/{id}` - Obtener reserva por ID
- `DELETE /api/bookings/{id}` - Eliminar reserva
- `POST /api/bookings/{id}/pay` - Confirmar pago

## 🎨 Funcionalidades Implementadas

### ✅ Completadas
- [x] Sistema de autenticación (login/registro)
- [x] Contexto de autenticación global
- [x] Protección de rutas
- [x] Manejo de errores de API
- [x] Estados de carga
- [x] Configuración de entorno
- [x] Tipos TypeScript completos
- [x] Hooks personalizados para API
- [x] Diseño responsive básico

### 🚧 Pendientes (Para futuras implementaciones)
- [ ] Páginas de catálogo de yates
- [ ] Sistema de reservas
- [ ] Panel de administración
- [ ] Gestión de pagos
- [ ] Búsqueda y filtros avanzados
- [ ] Dashboard de usuario
- [ ] Notificaciones en tiempo real

## 🛠️ Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Construir para producción
npm run start        # Servidor de producción
npm run lint         # Linter
```

## 🔒 Seguridad

- Tokens JWT para autenticación
- Protección de rutas sensibles
- Validación de formularios
- Manejo seguro de errores

## 📱 Compatibilidad

- Navegadores modernos (Chrome, Firefox, Safari, Edge)
- Diseño responsive para móviles y tablets
- Soporte para PWA (Progressive Web App)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico o preguntas sobre el proyecto, contacta al equipo de desarrollo.
