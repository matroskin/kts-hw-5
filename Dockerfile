# Используем базовый образ Node.js
FROM node:22-alpine

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем файл package.json и файл lock (если есть) для установки зависимостей
COPY package.json yarn.lock ./

# Устанавливаем зависимости
RUN yarn install

# Копируем остальные файлы проекта
COPY . .

# Компилируем проект для production-окружения
RUN yarn build

# Указываем порт, который будет прослушивать приложение
EXPOSE 3000

# Запуск production-сервера
CMD ["yarn", "start"]
