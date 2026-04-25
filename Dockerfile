FROM node:20-slim

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build

ENV NODE_ENV=production
ENV PORT=7860
ENV HOSTNAME="0.0.0.0"

EXPOSE 7860

CMD ["npx", "next", "start", "-p", "7860", "-H", "0.0.0.0"]
