FROM node:14.19.2-alpine

WORKDIR /app
COPY packege.json ./
COPY prisma ./prisma
RUN npm install

ENV PORT 3000
EXPOSE 3000

CMD ["node", "dist/main"]