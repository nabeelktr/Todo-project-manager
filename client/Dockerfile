FROM node:alpine as developement
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .

FROM node:alpine as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:alpine as production
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/.next ./.next
COPY --from=build /usr/src/app/public ./public
COPY --from=build /usr/src/app/node_modules ./node_modules
ENV NODE_ENV=production
CMD ["npm", "start"]



