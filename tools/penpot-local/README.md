# 🚀 Penpot Local — Infraestructura Oficial Khor

Este entorno utiliza la configuración oficial de Penpot v2.14+, garantizando máxima estabilidad y paridad con la versión cloud.

## 1. Requisitos
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) iniciado.

## 2. Instrucciones de Arranque Limpio
Para asegurar que la nueva configuración oficial no tenga conflictos con pruebas anteriores, ejecuta:

```bash
cd tools/penpot-local
docker compose down -v  # Borra volúmenes antiguos
docker compose up -d    # Inicia infraestructura oficial
```

## 3. Acceso a los Servicios
- **Penpot Dashboard**: [http://localhost:9005](http://localhost:9005)
- **Mailcatch (Emails)**: [http://localhost:1080](http://localhost:1080) (para ver correos de sistema)

## 4. Configuración del Plugin
En la raíz del proyecto Khor:
```bash
cd penpot-plugin
npm run dev -- --port 4400
```
Introduce esta URL en tu Penpot local: `http://localhost:4400/manifest.json`

---
*Nota: El primer arranque puede tardar 1-2 minutos mientras se inicializa la base de datos Postgres 15 y se realizan las migraciones.*
