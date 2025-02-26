FROM node:21-alpine

WORKDIR /app

COPY package.json .

RUN npm install

RUN apk update

RUN apk add python3 py3-pip

COPY requirements.txt .

RUN pip install -r requirements.txt --break-system-packages

COPY . .

EXPOSE 80

RUN npx prisma generate

RUN npm run build

CMD ["./entrypoint.sh"]