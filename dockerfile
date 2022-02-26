FROM node:16-slim
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY . .
CMD ["yarn", "start"]
