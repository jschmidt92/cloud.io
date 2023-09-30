FROM node:alpine as development

WORKDIR /app

COPY package*.json /

RUN npm install

COPY . .

RUN npm run build

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json /

COPY . .

RUN npm install --omit=dev

COPY --from=development /app/dist ./dist

CMD ["node", "dist/index"]