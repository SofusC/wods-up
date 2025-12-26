FROM node:20-slim

WORKDIR /app

RUN useradd -m appuser

COPY package*.json ./

RUN npm install --production

COPY server.js ./server.js
COPY public ./public
COPY workouts.db ./workouts.db

RUN chown -R appuser:appuser /app

USER appuser

EXPOSE 3000

CMD ["node", "server.js"]
