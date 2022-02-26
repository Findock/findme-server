FROM node:16.13
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY . .
CMD ["yarn", "start"]
