# Proyecto Micro Seller

## Descripción

Micro Seller es una aplicación web construida utilizando el stack MERN (MongoDB, Express.js, React.js, Node.js) y Docker para la gestión de contenedores.

## Tecnologías utilizadas

- **Frontend:**
  - **_ReactJS_**
  - **_Zustand_**
  - **_Lucide Icons_**
  - **_@tamstack/react-query_**
  - **_React Router_**
  - **_React Hook Forms_**
- **Backend:**
  - **_NodeJS_**
  - **_Express_**
  - **_Mongoose_**
  - **_MongoDB_**
- **Docker**: Contenedores para la gestión de dependencias y entornos

## Funcionalidades

- **_ABM de Productos_**: Control de existencias y precios de los productos.
- **_ABM de Compras_**: Control de los pedidos diarios.

## Instalación

Para instalar y ejecutar el proyecto, sigue estos pasos:

1. **Instala un Package Manager**

   - macOS: [Homebrew](https://brew.sh/)
   - Windows: [Chocolatey](https://chocolatey.org/install)

2. **_Instalar Git y Github CLI_**
   - ```bash
       brew install git gh
     ```
   - ```bash
       choco install git gh
     ```
3. **_Instalar Docker Desktop_**
   - [MacOS](https://docs.docker.com/desktop/install/mac-install/)
   - [Windows](https://docs.docker.com/desktop/install/windows-install/)
4. **_Autenticar al usuario_**

   ```
   bash gh auth login
   ```

5. **Clona el repositorio**:
   ```bash
   gh clone https://github.com/imthejota/melsfinal
   ```
6. **Ejecuta el proyecto**:
   ```bash
   cd melsfinal && docker-compose up -d
   ```
