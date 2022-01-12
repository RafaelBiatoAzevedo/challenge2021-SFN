FROM node:12-alpine
RUN mkdir -p /app/node_modules && chown -R node:node /app
WORKDIR /app
ARG PORT=3000
ARG SPACE_FLIGHT_NEWS_API_URI=https://api.spaceflightnewsapi.net/v3
ENV PORT=${PORT}
ENV SPACE_FLIGHT_NEWS_API_URI=${SPACE_FLIGHT_NEWS_API_URI}

# -- # Only for test Challenge2021-SFN
ARG PASSWORD_MONGODB_CLOUD=62178177
ENV PASSWORD_MONGODB_CLOUD=${PASSWORD_MONGODB_CLOUD}
# -- #

COPY package*.json ./
USER node
RUN yarn install && yarn build
COPY --chown=node:node . .
EXPOSE 3000
CMD [ "node", "src/api/server.js" ]