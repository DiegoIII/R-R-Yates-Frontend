# Solución de Problemas - Error "Failed to fetch"

## Problema
Al intentar hacer login, aparece el error:
```
Console TypeError: Failed to fetch
src/lib/api.ts (86:28) @ Object.getCurrentUser
```

## Causa
El frontend no puede conectarse al backend. Esto puede deberse a:

1. **Backend no está ejecutándose**
2. **Puertos incorrectos en la configuración**
3. **URLs del backend mal configuradas**
4. **Problemas de red/firewall**

## Solución

### 1. Verificar que el Backend esté Ejecutándose
Asegúrate de que tu backend esté ejecutándose en los puertos correctos:
- Servicio de Usuarios: Puerto 8083
- Servicio de Reservas: Puerto 8082  
- Servicio de Catálogo: Puerto 8081

### 2. Crear Archivo de Configuración
Crea un archivo `.env.local` en la raíz del proyecto con el siguiente contenido:

```bash
# URLs de los servicios del backend
NEXT_PUBLIC_USER_SERVICE_URL=http://localhost:8083
NEXT_PUBLIC_BOOKING_SERVICE_URL=http://localhost:8082
NEXT_PUBLIC_CATALOG_SERVICE_URL=http://localhost:8081
```

### 3. Verificar URLs del Backend
Si tu backend está en puertos diferentes, ajusta las URLs en el archivo `.env.local`.

### 4. Verificar Conectividad
El componente `BackendStatus` en la página principal te mostrará el estado de cada servicio:
- ✅ **En línea**: El servicio responde correctamente
- ❌ **Desconectado**: No se puede conectar al servicio
- ⚠️ **Error**: El servicio responde pero con error

### 5. Probar Endpoints del Backend
Verifica que estos endpoints estén disponibles:
- `http://localhost:8083/health` (o similar para verificar estado)
- `http://localhost:8083/api/users/login`
- `http://localhost:8083/api/users/me`

### 6. Verificar CORS
Asegúrate de que tu backend tenga configurado CORS para permitir peticiones desde `http://localhost:3000` (puerto por defecto de Next.js).

### 7. Reiniciar Servicios
1. Detén el frontend (Ctrl+C en la terminal)
2. Detén el backend
3. Inicia el backend primero
4. Inicia el frontend (`npm run dev`)

## Logs de Depuración
El código ahora incluye logs detallados en la consola del navegador. Revisa la consola para ver:
- URLs a las que se intenta conectar
- Respuestas del servidor
- Errores específicos

## Comandos Útiles

### Verificar Puertos en Uso
```bash
# macOS/Linux
lsof -i :8083
lsof -i :8082
lsof -i :8081

# Windows
netstat -an | findstr :8083
```

### Verificar Conectividad
```bash
# Probar si el puerto está abierto
telnet localhost 8083
curl http://localhost:8083/health
```

## Contacto
Si el problema persiste, verifica:
1. La configuración de tu backend
2. Los logs del backend
3. Que no haya conflictos de puertos
4. La configuración de red/firewall
