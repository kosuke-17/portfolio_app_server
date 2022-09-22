FROM node:14.19.2-alpine

WORKDIR /app
COPY packege.json ./
COPY prisma ./prisma
RUN npm install

ENV PORT 3001
EXPOSE 3001

CMD ["node", "dist/main"]