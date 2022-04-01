FROM node:16-alpine
WORKDIR /app
COPY . .
RUN yarn install --prod
RUN yarn build
CMD ["yarn", "start:prod"]
