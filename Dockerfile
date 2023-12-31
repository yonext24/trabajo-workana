FROM node:20-alpine as BUILD_IMAGE

WORKDIR /app/react-app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine as PRODUCTION_IMAGE

WORKDIR /app/react-app

# Copiar solo los archivos necesarios para la ejecución en producción
COPY --from=BUILD_IMAGE /app/react-app/dist/ /app/react-app/dist/
COPY --from=BUILD_IMAGE /app/react-app/node_modules/ /app/react-app/node_modules/

COPY package.json .
COPY vite.config.js .

EXPOSE 3000
CMD ["npx", "vite", "preview", "--port", "3000"]
